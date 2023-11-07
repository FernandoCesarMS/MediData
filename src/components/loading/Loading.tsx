import React from 'react';
import { LoadingSpinnerOverlay, LoadingSpinnerContainer, LoadingSpinner } from '../../App.styles'

function Loading() {
    return (
        <LoadingSpinnerOverlay>
            <LoadingSpinnerContainer>
                <LoadingSpinner></LoadingSpinner>
                <LoadingSpinner></LoadingSpinner>
                <LoadingSpinner></LoadingSpinner>
                <LoadingSpinner></LoadingSpinner>
                <LoadingSpinner></LoadingSpinner>
                <LoadingSpinner></LoadingSpinner>
            </LoadingSpinnerContainer>
        </LoadingSpinnerOverlay>
    )
}

export default Loading;