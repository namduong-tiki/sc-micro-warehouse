import { CreateContext } from "@/pages/Withdrawal/contexts/CreateContext"
import { useContext } from "react"

export const useCreateHook = () => {

    const {
        isVisible,
        onCloseCreateModal,
        isLoading,
        setCurrentStep,
        currentStep,
    } = useContext(CreateContext)
    return {
        isVisible,
        onCloseCreateModal,
        isLoading,
        setCurrentStep,
        currentStep,
    }
}

