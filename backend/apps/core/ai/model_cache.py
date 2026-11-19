import threading

# Thread‑safe singleton caches for heavy AI models
_spacy_nlp = None
_spacy_lock = threading.Lock()

_sentence_transformer = None
_sentence_lock = threading.Lock()

def get_spacy_nlp():
    """Lazy‑load and cache the spaCy language model.
    Returns the loaded nlp object. Thread‑safe.
    """
    global _spacy_nlp
    if _spacy_nlp is None:
        with _spacy_lock:
            if _spacy_nlp is None:
                import spacy
                _spacy_nlp = spacy.load("en_core_web_sm")
    return _spacy_nlp

def get_sentence_transformer(model_name="all-MiniLM-L6-v2"):
    """Lazy‑load and cache a SentenceTransformer model.
    Returns the loaded model instance.
    """
    global _sentence_transformer
    if _sentence_transformer is None:
        with _sentence_lock:
            if _sentence_transformer is None:
                from sentence_transformers import SentenceTransformer
                _sentence_transformer = SentenceTransformer(model_name)
    return _sentence_transformer
