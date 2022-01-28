import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "bson";
import { IGridFSObject } from "mongo-gridfs";

@ObjectType()
export class Metadata {

    @Field()
    filename: string;

}


@ObjectType()
export class FileObject implements IGridFSObject {

    @Field(() => ID)
    _id: ObjectId;

    @Field()
    length: number;

    @Field()
    chunkSize: number;

    @Field()
    uploadDate: Date;

    @Field()
    md5: string;

    @Field()
    filename: string;

    @Field()
    contentType: string;

    @Field(() => Metadata)
    metadata: Metadata;

    constructor(file: IGridFSObject) {
        this._id = file._id;
        this.length = file.length;
        this.chunkSize = file.chunkSize;
        this.uploadDate = file.uploadDate;
        this.md5 = file.md5;
        this.filename = file.filename;
        this.contentType = file.contentType;
        this.metadata = (file.metadata as Metadata);
    }

}
