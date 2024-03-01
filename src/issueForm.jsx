import React,{ useEffect, useState } from "react";

const IssueForm = () => {
    return (
        <>
            <form>
                <div>
                    <label>
                        HU
                    </label>
                    <br/>
                    <input disabled/>
                </div>

                <div>
                    <label>
                        Quantity
                    </label>
                    <br/>
                    <input disabled/>
                </div>

                <div>
                    <label>
                        Issue
                    </label>
                    <br/>
                    <input/>
                </div>
            </form>
        </>
    )
}

export default IssueForm;