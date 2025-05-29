# type: ignore
import whisper
from pathlib import Path
from app.config.video_to_text_config import settings
from app.utils.video_to_text_utils import convert_to_wav, clean_temp_files, convert_to_mp3
import logging
import yt_dlp
logger = logging.getLogger(__name__)

class YouTubeProcessor:
    def __init__(self):
        # Configure yt-dlp with FFmpeg path
        self.ydl_opts = {
            'cookiefile': '/home/ubuntu/cookies/youtube_cookies.txt',
            'format': 'bestaudio/best',
            'outtmpl': str(settings.CACHE_DIR / '%(id)s.%(ext)s'),
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
            }],
            'quiet': True,
            'logger': logger,
        }
        
        # Only set ffmpeg_location if explicitly provided
        if settings.FFMPEG_DIR is not None:
            self.ydl_opts['ffmpeg_location'] = str(settings.FFMPEG_DIR)

        self.model = whisper.load_model(settings.WHISPER_MODEL)

    def download_audio(self, url: str) -> Path:
        """Download YouTube audio and return path"""
        with yt_dlp.YoutubeDL(self.ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            if 'requested_downloads' in info:
                return Path(info['requested_downloads'][0]['filepath'])
            return Path(ydl.prepare_filename(info))

    def transcribe_audio(self, audio_path: Path) -> str:
        """Transcribe audio using Whisper"""
        if not audio_path.exists():
            raise FileNotFoundError(f"Audio file not found: {audio_path}")
        return self.model.transcribe(str(audio_path))['text']

    def process_youtube(self, url: str) -> str:
        """Full YouTube processing pipeline"""
        try:
            logger.info("Downloading audio from YouTube...")
            audio_path = self.download_audio(url)

            logger.info(f"Downloaded to: {audio_path}")

            logger.info("Converting to MP3...")
            mp3_path = settings.CACHE_DIR / 'audio.mp3'
            convert_to_mp3(audio_path, mp3_path)

            logger.info("Transcribing audio...")
            return self.transcribe_audio(mp3_path)
        finally:
            clean_temp_files()
            
class FileProcessor:
    # def __init__(self):
    #     self.model = whisper.load_model(settings.WHISPER_MODEL)

    # def transcribe(self, file_path: Path) -> str:
    #     wav_path = settings.CACHE_DIR / 'audio.wav'
    #     convert_to_wav(file_path, wav_path)
    #     return self.model.transcribe(str(wav_path))['text']
    
    def process_file(self, file_path: Path) -> str:
        """Process local audio/video file"""
        try:
            logger.info(f"Processing local file: {file_path}")
            wav_path = settings.CACHE_DIR / 'audio.wav'
            convert_to_wav(file_path, wav_path)  # Using the new WAV conversion
            return self.transcribe_audio(wav_path)
        finally:
            clean_temp_files()
