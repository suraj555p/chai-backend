import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const healthCheck = asyncHandler(async (_, res) => {
    res.status(200).json(
        new ApiResponse(
            200,
            "Hey, this is a test case and I am ready to run "
        ) 
    );
});

export { healthCheck };