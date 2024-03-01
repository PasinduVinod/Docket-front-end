import { useEffect, useState } from "react";
import ExcelReader from "./uploadexcel";
import ViewData from "./viewData";

const Home = () => {
    const [isUploaded, setIsUploaded] = useState(false);
    const [isViewData, setIsViewData] = useState(false);

    const ViewDataHandler = () => {
        setIsViewData(true);
        setIsUploaded(false);
    }

    const UploadDataHandler = () => {
        setIsUploaded(true);
        setIsViewData(false);
    }

    return (
        <>
            <div>
                <button onClick={UploadDataHandler}>
                    Upload File
                </button>
                <button onClick={ViewDataHandler}>
                    View Data
                </button>
                <div>
                    {isUploaded == true && <ExcelReader/>}
                    {isViewData == true && <ViewData/>}
                </div>
            </div>
        </>
    )
}

export default Home;