"""Audio Generation & Speed Variation Metadata Helper."""
from typing import Dict, Any


class AudioGenerator:
    """Manages lesson audio prompts and adjusted playback durations."""

    SAMPLE_PROMPTS: Dict[str, Dict[str, Any]] = {
        "bollywood_kabhi_kabhi": {
            "title": "Kabhi Kabhie Mere Dil Mein",
            "year": "1976 CLASSIC",
            "duration_sec": 5.0,
            "default_speed": 0.75,
            "lyrics_hi": "कभी कभी मेरे दिल में ख़याल आता है",
            "lyrics_en": "Sometimes a thought comes into my heart",
            "missing_word": "दिल",
        },
        "streetfood_pani_puri": {
            "title": "Old Delhi Pani Puri Order",
            "vendor": "Pani Puri Cart • Old Delhi",
            "duration_sec": 4.5,
            "default_speed": 0.8,
            "prompt_hi": "भैया, पानी पूरी थोड़ा तीखा और कम मीठा बनाना।",
            "prompt_en": "Make the Pani Puri a little spicy and less sweet.",
            "missing_word": "तीखा",
        },
        "cricket_six": {
            "title": "Wankhede Final Ball",
            "duration_sec": 3.8,
            "default_speed": 1.0,
            "phrase_hi": "आख़िरी गेंद पर शानदार छक्का!",
            "phrase_en": "Aakhiri gend par shaandaar chhakka!",
        },
    }

    @classmethod
    def get_prompt_metadata(cls, clip_id: str, speed: float = 1.0) -> Dict[str, Any]:
        """Fetch clip metadata and calculate effective duration adjusted by speed."""
        clip = cls.SAMPLE_PROMPTS.get(
            clip_id,
            {
                "title": "Custom Lesson Clip",
                "duration_sec": 3.0,
                "default_speed": speed,
            },
        )
        base_duration = clip.get("duration_sec", 3.0)
        effective_duration = round(base_duration / max(0.5, speed), 2)

        return {
            "clip_id": clip_id,
            "playback_speed": speed,
            "effective_duration_sec": effective_duration,
            "metadata": clip,
        }

