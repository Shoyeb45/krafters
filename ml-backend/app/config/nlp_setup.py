# type: ignore
import nltk
import spacy
import logging

logger = logging.getLogger(__name__)

# Global NLP variables
nlp = None

def download_nltk_resources():
    """Download required NLTK resources"""
    resources = ['punkt', 'averaged_perceptron_tagger']
    for resource in resources:
        try:
            nltk.download(resource, quiet=True)
            logger.info(f"Downloaded NLTK resource: {resource}")
        except Exception as e:
            logger.error(f"Error downloading {resource}: {e}")
            raise e

def load_spacy_model():
    """Load spaCy model"""
    global nlp
    try:
        nlp = spacy.load("en_core_web_sm")
        logger.info("spaCy model loaded successfully")
    except OSError as e:
        error_msg = "Error loading spaCy model. Run 'python -m spacy download en_core_web_sm' to download the model."
        logger.error(error_msg)
        raise RuntimeError(error_msg) from e
    except Exception as e:
        logger.error(f"Unexpected error loading spaCy model: {e}")
        raise e

def setup_nlp():
    """Initialize all NLP resources"""
    try:
        download_nltk_resources()
        load_spacy_model()
        logger.info("NLP setup completed successfully!")
    except Exception as e:
        logger.error(f"NLP setup failed: {e}")
        raise e

def get_nlp_model():
    """Get spaCy NLP model instance"""
    global nlp
    if nlp is None:
        raise RuntimeError("NLP model not initialized. Call setup_nlp() first.")
    return nlp