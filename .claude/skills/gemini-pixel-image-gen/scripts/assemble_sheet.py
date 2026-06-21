#!/usr/bin/env python3
"""
Sprite Sheet Assembly Tool

Takes individual frame PNGs and assembles them into grid-based sprite sheets.

Usage:
    python3 assemble_sheet.py --input-dir ./frames/ --output sheet.png --grid 7x3 --cell-size 16x32
    python3 assemble_sheet.py --input-dir ./tiles/ --output tileset.png --grid 9x1 --cell-size 16x16

Frame naming convention:
    Files are sorted alphanumerically. Use naming like:
    - walk_down_0.png, walk_down_1.png, walk_down_2.png
    - frame_00.png, frame_01.png, frame_02.png
    Or specify explicit order with --frame-order.

Requires:
    pip install Pillow
"""

import argparse
import sys
from pathlib import Path

from PIL import Image


def assemble_sheet(
    input_dir: str,
    output_path: str,
    grid: str,
    cell_size: str,
    frame_order: list = None,
    background: tuple = (0, 0, 0, 0),
) -> str:
    """Assemble individual frames into a sprite sheet grid."""
    cols, rows = (int(x) for x in grid.lower().split("x"))
    cell_w, cell_h = (int(x) for x in cell_size.lower().split("x"))
    total_cells = cols * rows

    sheet_w = cols * cell_w
    sheet_h = rows * cell_h

    print(f"Grid: {cols}x{rows} = {total_cells} cells")
    print(f"Cell size: {cell_w}x{cell_h}")
    print(f"Sheet size: {sheet_w}x{sheet_h}")

    # Collect frame files
    input_path = Path(input_dir)
    if frame_order:
        frames = [input_path / f for f in frame_order]
    else:
        frames = sorted(
            [f for f in input_path.iterdir() if f.suffix.lower() in (".png", ".jpg", ".jpeg")],
            key=lambda f: f.name,
        )

    if not frames:
        print(f"Error: No image files found in {input_dir}", file=sys.stderr)
        sys.exit(1)

    print(f"Found {len(frames)} frames (need {total_cells})")

    if len(frames) < total_cells:
        print(f"Warning: Only {len(frames)} frames for {total_cells} cells. Empty cells will be transparent.")
    elif len(frames) > total_cells:
        print(f"Warning: {len(frames)} frames but only {total_cells} cells. Extra frames ignored.")
        frames = frames[:total_cells]

    # Create the sheet
    sheet = Image.new("RGBA", (sheet_w, sheet_h), background)

    for i, frame_path in enumerate(frames):
        if not frame_path.exists():
            print(f"  Warning: Frame not found: {frame_path}")
            continue

        frame = Image.open(frame_path).convert("RGBA")

        # Resize frame if needed
        if frame.size != (cell_w, cell_h):
            frame = frame.resize((cell_w, cell_h), Image.NEAREST)

        col = i % cols
        row = i // cols
        x = col * cell_w
        y = row * cell_h

        sheet.paste(frame, (x, y), frame)
        print(f"  [{row},{col}] {frame_path.name}")

    # Save
    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out, "PNG")
    print(f"Output: {out} ({sheet_w}x{sheet_h})")
    return str(out)


def split_sheet(
    input_path: str,
    output_dir: str,
    grid: str,
    cell_size: str,
    prefix: str = "frame",
) -> list:
    """Split a sprite sheet into individual frame PNGs."""
    cols, rows = (int(x) for x in grid.lower().split("x"))
    cell_w, cell_h = (int(x) for x in cell_size.lower().split("x"))

    img = Image.open(input_path).convert("RGBA")
    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    print(f"Splitting {input_path} into {cols}x{rows} grid ({cell_w}x{cell_h} cells)")

    saved = []
    for row in range(rows):
        for col in range(cols):
            x = col * cell_w
            y = row * cell_h
            cell = img.crop((x, y, x + cell_w, y + cell_h))

            # Skip entirely transparent cells
            if cell.getbbox() is None:
                continue

            name = f"{prefix}_{row:02d}_{col:02d}.png"
            cell_path = out_path / name
            cell.save(cell_path, "PNG")
            saved.append(str(cell_path))
            print(f"  [{row},{col}] -> {name}")

    print(f"Saved {len(saved)} frames to {output_dir}")
    return saved


def main():
    parser = argparse.ArgumentParser(
        description="Assemble or split sprite sheet grids",
    )
    sub = parser.add_subparsers(dest="command", help="Command")

    # Assemble command
    asm = sub.add_parser("assemble", help="Assemble frames into a sprite sheet")
    asm.add_argument("--input-dir", "-i", required=True, help="Directory of frame PNGs")
    asm.add_argument("--output", "-o", required=True, help="Output sprite sheet path")
    asm.add_argument("--grid", required=True, help="Grid dimensions as COLSxROWS (e.g., 7x3)")
    asm.add_argument("--cell-size", required=True, help="Cell size as WxH (e.g., 16x32)")
    asm.add_argument("--frame-order", nargs="+", help="Explicit frame file names in order")

    # Split command
    spl = sub.add_parser("split", help="Split a sprite sheet into individual frames")
    spl.add_argument("--input", "-i", required=True, help="Input sprite sheet path")
    spl.add_argument("--output-dir", "-o", required=True, help="Output directory for frames")
    spl.add_argument("--grid", required=True, help="Grid dimensions as COLSxROWS")
    spl.add_argument("--cell-size", required=True, help="Cell size as WxH")
    spl.add_argument("--prefix", default="frame", help="Output filename prefix")

    args = parser.parse_args()

    if args.command == "assemble":
        assemble_sheet(
            input_dir=args.input_dir,
            output_path=args.output,
            grid=args.grid,
            cell_size=args.cell_size,
            frame_order=args.frame_order,
        )
    elif args.command == "split":
        split_sheet(
            input_path=args.input,
            output_dir=args.output_dir,
            grid=args.grid,
            cell_size=args.cell_size,
            prefix=args.prefix,
        )
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
