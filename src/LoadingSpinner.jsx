export default function LoadingSpinner({ isLoaded }){

    return <div 
    className={isLoaded ? "displayNone" : "spinnerContainer"}>
        <div className="loadingSpinner"></div>
    </div>
}