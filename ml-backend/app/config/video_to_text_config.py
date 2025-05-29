import os
import platform
from pathlib import Path
from shutil import which
from dotenv import load_dotenv

load_dotenv()

class Settings:
    INPUT_DIR = Path("public/input_videos")
    OUTPUT_DIR = Path("public/output_text")
    CACHE_DIR = Path("public/temp_files")
    
    os.makedirs(INPUT_DIR, exist_ok=True)  # Create uploads/ if it doesn't exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)  # Create audio/ if it doesn't exist
    os.makedirs(CACHE_DIR, exist_ok=True)  # Create audio/ if it doesn't exist
    
    IS_WINDOWS = platform.system() == "Windows"

    if IS_WINDOWS:
        FFMPEG_DIR = Path(__file__).parent.parent / "ffmpeg" / "ffmpeg-2025-04-21-git-9e1162bdf1-full_build" / "bin"
        FFMPEG_PATH = FFMPEG_DIR / "ffmpeg.exe"
        FFPROBE_PATH = FFMPEG_DIR / "ffprobe.exe"
    else:
        # Assume ffmpeg is installed and in PATH
        FFMPEG_DIR = None
        FFMPEG_PATH = "ffmpeg"
        FFPROBE_PATH = "ffprobe"

    WHISPER_MODEL = os.getenv("WHISPER_MODEL", "base")

    @classmethod
    def setup_dirs(cls):
        for path in [cls.INPUT_DIR, cls.OUTPUT_DIR, cls.CACHE_DIR]:
            path.mkdir(exist_ok=True)

    # @classmethod
    # def verify_ffmpeg(cls):

    #     if cls.IS_WINDOWS:
    #         if not Path(cls.FFMPEG_PATH).exists():
    #             raise FileNotFoundError(f"FFmpeg not found at {cls.FFMPEG_PATH}")
    #         if not Path(cls.FFPROBE_PATH).exists():
    #             raise FileNotFoundError(f"FFprobe not found at {cls.FFPROBE_PATH}")
    #     else:
    #         # Optional: check if ffmpeg is installed on Linux/macOS
    #         from shutil import which
    #         if which("ffmpeg") is None:
    #             raise FileNotFoundError("FFmpeg not found in system PATH")
    #         if which("ffprobe") is None:
    #             raise FileNotFoundError("FFprobe not found in system PATH")

    @classmethod
    def verify_ffmpeg(cls):
        if cls.IS_WINDOWS:
            if not Path(cls.FFMPEG_PATH).exists():
                raise FileNotFoundError(f"FFmpeg not found at {cls.FFMPEG_PATH}")
            if not Path(cls.FFPROBE_PATH).exists():
                raise FileNotFoundError(f"FFprobe not found at {cls.FFPROBE_PATH}")
        else:
            ffmpeg_path = which("ffmpeg")
            ffprobe_path = which("ffprobe")
            print(f"ffmpeg found at: {ffmpeg_path}")
            print(f"ffprobe found at: {ffprobe_path}")
            if ffmpeg_path is None:
                raise FileNotFoundError("FFmpeg not found in system PATH")
            if ffprobe_path is None:
                raise FileNotFoundError("FFprobe not found in system PATH")
            
settings = Settings()
