import React, { useCallback, memo } from 'react'
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const StepScreen = ({ current = 1 }) => {
    const screen = useCallback(
        () => {
            switch (current) {
                case 1:
                    return <Step1 />
                case 2:
                    return <Step2 />
                case 3:
                    return <Step3 />

                default:
                    return <Step1 />
            }
        },
        [current],
    )

    return screen()
}

export default memo(StepScreen)


