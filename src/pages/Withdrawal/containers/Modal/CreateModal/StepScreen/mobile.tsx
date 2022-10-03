import React, { useCallback, memo } from 'react'
import Step1 from './Step1/mobile';
import Step2 from './Step2/mobile';
import Step3 from './Step3';

const StepScreenMobile = ({ current = 1 }) => {
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

export default memo(StepScreenMobile)


