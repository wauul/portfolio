"""Compatibility entry point for the English CV; use build_cv.py for both languages."""
import sys
from build_cv import main

if __name__ == "__main__":
    if "--lang" not in sys.argv:
        sys.argv.extend(["--lang", "en"])
    main()
