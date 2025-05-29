import platform
import subprocess
import shutil
import logging
from pathlib import Path
from app.config.video_to_text_config import settings
import os
logger = logging.getLogger(__name__)

def check_dependencies():
    settings.verify_ffmpeg()
    for dep in ['ffmpeg', 'ffprobe']:
        if not shutil.which(dep):
            raise RuntimeError(f"{dep} not found in system PATH")

def convert_to_wav(input_path: Path, output_path: Path):
    input_path = input_path.resolve()
    output_path = output_path.resolve()

    command = [
        str(settings.FFMPEG_PATH), '-i', str(input_path),
        '-acodec', 'pcm_s16le', '-ac', '1', '-ar', '16000',
        '-y', str(output_path)
    ]

    subprocess.run(command, check=True, shell=(platform.system() == "Windows"))


def clean_temp_files():
    for file in settings.CACHE_DIR.glob('*'):
        try:
            file.unlink()
        except Exception as e:
            logger.warning(f"Failed to delete {file}: {e}")

def convert_to_mp3(input_path: Path, output_path: Path):
    """Convert any audio/video file to MP3 using ffmpeg"""
    if not input_path.exists():
        raise FileNotFoundError(f"Input file not found: {input_path}")

    command = [
        str(settings.FFMPEG_PATH),
        '-i', str(input_path),
        '-vn',
        '-acodec', 'libmp3lame',
        '-q:a', '2',
        '-y',
        str(output_path)
    ]

    try:
        result = subprocess.run(
            command,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        logger.debug("FFmpeg output: %s", result.stderr)
    except subprocess.CalledProcessError as e:
        logger.error("FFmpeg command failed: %s", e.stderr)
        raise RuntimeError(f"Audio conversion failed: {e.stderr}")
    
def convert_to_wav(input_path: Path, output_path: Path):
    """Convert any audio/video file to WAV using ffmpeg"""
    if not input_path.exists():
        raise FileNotFoundError(f"Input file not found: {input_path}")

    command = [
        str(settings.FFMPEG_PATH),
        '-i', str(input_path),
        '-acodec', 'pcm_s16le',
        '-ac', '1',
        '-ar', '16000',
        '-y',
        str(output_path)
    ]

    try:
        subprocess.run(
            command,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg conversion failed: {e.stderr}")
        raise RuntimeError(f"Audio conversion failed: {e.stderr}")