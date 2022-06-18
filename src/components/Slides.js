import React, { useState, useEffect } from 'react';

function Slides({ slides }) {
    const [slide, setSlide] = useState(slides[0])
    const [disablePrev, setDisablePrev] = useState(true)
    const [disableNext, setDisableNext] = useState(false)
    const [disableRestart, setDisableRestart] = useState(true)

    useEffect(() => {
        let lastIndex = slides.length - 1
        let currentIndex = slides.findIndex(element => element.title === slide.title)

        if (currentIndex === lastIndex) {
            setDisableNext(true)
        } else if (currentIndex === 0) {
            setDisablePrev(true)
            setDisableRestart(true)
        } else if (currentIndex > 0 && currentIndex < lastIndex) {
            setDisableNext(false)
            setDisablePrev(false)
            setDisableRestart(false)
        }
    }, [slide, slides])

    const handleRestart = () => {
        setDisablePrev(false)
        setDisableNext(false)
        setSlide(slides[0])
    }

    const handleMove = (step) => {
        setSlide(slides[slides.findIndex(element => element.title === slide.title) + step])
    }

    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart"
                    className="small outlined"
                    onClick={handleRestart}
                    disabled={disableRestart}
                >
                    Restart
                </button>
                <button data-testid="button-prev"
                    className="small"
                    disabled={disablePrev}
                    onClick={() => handleMove(-1)}
                >
                    Prev
                </button>
                <button data-testid="button-next"
                    className="small"
                    disabled={disableNext}
                    onClick={() => handleMove(1)}
                >
                    Next
                </button>
            </div>

            <div id="slide" className="card text-center" >
                <h1 data-testid="title">{slide.title}</h1>
                <p data-testid="text">{slide.text}</p>
            </div>
        </div>
    );
}

export default Slides;
