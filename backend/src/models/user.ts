import mongoose,{Document,Schema} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    image: string;
    subscription: Date | null,
    freeRequestsUsed: number,

    hasProAccess(): boolean;
    canMakeRequest(): boolean;
}

const schema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    subscription: { type: Date, default: null },
    freeRequestsUsed: { type: Number, default: 0 },   
},{timestamps: true});

schema.methods.hasProAccess = function (): boolean {
    return this.subscription !== null && new Date(this.subscription) > new Date();
}
schema.methods.canMakeRequest = function (): boolean {
    const FREE_REQUEST_LIMIT = 3;
    return this.hasProAccess() || this.freeRequestsUsed < FREE_REQUEST_LIMIT;
}

const User = mongoose.model<IUser>('User', schema);
export default User;