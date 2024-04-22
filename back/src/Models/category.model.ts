import mongoose, { Schema, Document, Model } from "mongoose";

interface ICategory extends Document {
    id: number;
    name: string;
}

interface ICategoryModel extends Model<ICategory> {
    fetchCategories(): Promise<ICategory[]>;
    // fetchCategoryById(id: string): Promise<ICategory | null>;
    createCategory(name: string): Promise<ICategory>;
    deleteCategoryById(id: string): Promise<ICategory | null>;
    updateCategoryById(id: string, name: string): Promise<ICategory | null>;
}

const CategorySchema: Schema = new Schema({
    // id: { type: Number, required: true },
    name: { type: String, required: true }
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    });

//virtuals
/*
PostSchema.virtual('id').get(function (this: IPost) {
    return this._id;
});
*/

CategorySchema.statics.fetchCategories = async function (): Promise<ICategory[]> {
    return this.find();
};



CategorySchema.statics.createCategory = async function (name: string): Promise<ICategory> {
    return this.create({ name });
};

CategorySchema.statics.deleteCategoryById = async function (id: string): Promise<ICategory | null> {
    return this.findByIdAndDelete(id);
};

CategorySchema.statics.updateCategoryById = async function (id: string, name: string): Promise<ICategory | null> {
    return this.findByIdAndUpdate(id, { name }, { new: true });
}

const Category = mongoose.model<ICategory, ICategoryModel>('Category', CategorySchema);

export default Category;