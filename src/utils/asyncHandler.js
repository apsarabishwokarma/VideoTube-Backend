// const asyncHandler =()=>{}
//const asyncHandler =(f)=>{()=>{}}

import { message } from "statuses";

//const asyncHandler = (func) => {
//   {
//     async () => {};
//   }
// };
//const asyncHandler =(f)=>async()=>{}

//1.TRY_CATCH ASYNC HANDLER
// const asyncHandler = (func) => {
//   async (req, res, next) => {
//     try {
//       await func(req, res, next);
//     } catch (err) {
//       res.status(err.code || 500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   };
// };

//2.PROMISES THEN AND CATCH

const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
