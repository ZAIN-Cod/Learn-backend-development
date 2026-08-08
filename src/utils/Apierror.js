class ApiError extends Error {
    constructor(message="Something went wrong", 
        statusCode,
        error=[],
        stack=""
        
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = error;
        this.stack = stack;
        this.data = null;
        this.success = false;

        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}