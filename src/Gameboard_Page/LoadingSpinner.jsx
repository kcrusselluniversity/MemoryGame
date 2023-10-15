export default function LoadingSpinner({ gameState: {isLoaded} }){

    return <div 
    className={isLoaded ? "displayNone" : "spinnerContainer"}>
        <div className="loadingSpinner"></div>
    </div>
}