# utils/text_processor.py
import re
import logging
from app.config.nlp_setup import get_nlp_model

logger = logging.getLogger(__name__)

# Dictionary for common English contractions
CONTRACTIONS = {
    "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is",
    "it's": "it is", "we're": "we are", "they're": "they are",
    "i've": "i have", "you've": "you have", "we've": "we have", "they've": "they have",
    "i'll": "i will", "you'll": "you will", "he'll": "he will", "she'll": "she will",
    "we'll": "we will", "they'll": "they will", "it'll": "it will",
    "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not",
    "haven't": "have not", "hasn't": "has not", "hadn't": "had not",
    "won't": "will not", "wouldn't": "would not", "don't": "do not", "doesn't": "does not",
    "didn't": "did not", "can't": "cannot", "couldn't": "could not", "shouldn't": "should not",
    "mightn't": "might not", "mustn't": "must not"
}

def expand_contractions(text: str) -> str:
    """Expands contractions in the given text while preserving capitalization."""
    contractions_pattern = re.compile(
        r'\b(' + '|'.join(re.escape(k) for k in CONTRACTIONS.keys()) + r')\b', 
        re.IGNORECASE
    )
    
    def replace(match):
        word = match.group(0).lower()  # Match word case-insensitively
        expanded = CONTRACTIONS.get(word, word)  # Get expanded version
        return expanded.capitalize() if match.group(0)[0].isupper() else expanded  # Preserve capitalization

    return contractions_pattern.sub(replace, text)

def preprocess_text(text: str) -> str:
    """Enhanced preprocessing for ISL conversion with contraction handling and time format preservation."""
    text = text.lower().strip()
    
    # Expand contractions
    text = expand_contractions(text)

    # Convert time format (e.g., "10:30" → "10 30", "7:00" → "7")
    text = re.sub(r'\b(\d{1,2}):00\b', r'\1', text)  # Remove ':00'
    text = re.sub(r'\b(\d{1,2}):(\d{1,2})\b', r'\1 \2', text)  # Replace ':' with space

    # Remove all other non-alphanumeric characters except spaces
    text = re.sub(r'[^\w\s]', '', text)

    return text

def extract_isl_structure_spacy(text: str) -> str:
    """
    Converts each word in the input sentence to its base form and removes unnecessary words.
    Also identifies tense markers for ISL representation and preserves directional words.
    """
    try:
        nlp = get_nlp_model()
        doc = nlp(text)
        important_words = []
        tense_marker = ""

        # List of direction-related words that should not be lemmatized
        keep_words = {
            "left", "right", "back", "straight", "forward", "up", "down", 
            "near", "next", "beside", "in", "on", "under", "from", "to"
        }

        for token in doc:
            # Preserve direction words as they are
            if token.text.lower() in keep_words:
                important_words.append(token.text.lower())
                continue

            # Remove auxiliary verbs
            if token.pos_ in ["AUX"] and token.lemma_ in ["be", "do", "have", "will"]:
                if token.lemma_ == "will":
                    tense_marker = "FUTURE"
                continue 
            
            if token.pos_ in ["DET", "ADP"]:  # Remove determiners and prepositions
                continue
            
            if token.tag_ in ["VBD", "VBN"]:  # Past tense verbs
                tense_marker = "PAST"
                important_words.append(token.lemma_)
            elif token.tag_ in ["VBG", "VBZ", "VBP"]:  # Present continuous/simple present
                important_words.append(token.lemma_)
            else:
                important_words.append(token.lemma_)

        # Add the tense marker at the end if applicable
        if tense_marker:
            important_words.append(tense_marker)

        result = " ".join(important_words) if important_words else text
        logger.debug(f"ISL structure extraction result: {result}")
        return result
        
    except Exception as e:
        logger.error(f"Error in ISL structure extraction: {e}")
        raise e

def process_text_to_isl(text: str) -> str:
    """Complete text processing pipeline"""
    try:
        logger.info(f"Processing text: {text}")
        processed_text = preprocess_text(text)
        isl_structure = extract_isl_structure_spacy(processed_text)
        logger.debug(f"Final ISL structure: {isl_structure}")
        return isl_structure
    except Exception as e:
        logger.error(f"Error in text processing pipeline: {e}")
        raise e