import { EventEmitter } from "events";

// @flow

export type mongodb$ReadPreference =
  | "PRIMARY"
  | "PRIMARY_PREFERRED"
  | "SECONDARY"
  | "SECONDARY_PREFERRED"
  | "NEAREST";

export type mongodb$ReadConcernLevel =
  | 'local'
  | 'available'
  | 'majority'
  | 'linearizable'
  | 'snapshot';

export type mongodb$ProfilingLevel =
  | 'off'
  | 'slow_only'
  | 'all';

export type mongodb$CursorFlag =
  | "tailable"
  | "oplogReplay"
  | "noCursorTimeout"
  | "awaitData"
  | "partial";

export type mongodb$BulkWriteResult = void;

export type mongodb$ReadConcern = {
  level?: mongodb$ReadConcernLevel,
};

export type mongodb$WriteConcern = {
  w?: number | "majority",
  j?: boolean,
  wtimeout?: number,
};

export type mongodb$ErrorCallback = (err: ?MongoError) => void;

export type mongodb$AggregateOptions = {
  readPreference?: mongodb$ReadPreference,
  cursor?: Object,
  explain?: boolean,
  allowDiskUse?: boolean,
  maxTimeMS?: number,
  bypassDocumentValidation?: boolean,
  raw?: boolean,
  promoteLongs?: boolean,
  promoteValues?: boolean,
  promoteBuffers?: boolean,
  collation?: Object,
  comment?: string,
  hint?: string | Object,
  session?: ClientSession,
};

export type mongodb$BulkWriteOpResult = {
  insertedCount: number,
  matchedCount: number,
  modifiedCount: number,
  deletedCount: number,
  upsertedCount: number,
  insertedIds: Object,
  result: Object,
}

export type mongodb$SocketOptions = {
  socketOptions?: {
    noDelay?: boolean,
    keepAlive?: boolean,
    keepAliveInitialDelay?: number,
    connectTimeoutMS?: number,
    socketTimeoutMS?: number
  }
};

declare type mongodb$AggregationCallback = (error: MongoError, cursor: AggregationCursor) => void;


export type mongodb$ResultCallback = (error: ?MongoError, result: {}) => void;
export type mongodb$AggResultCallback = (error: ?MongoError, result: {} | null) => void;

export type mongodb$collectionResultCallback = (error: ?MongoError, collection: Collection) => void;

export type mongodb$IndexCreateOptions = {
  unique?: boolean,
  sparse?: boolean,
  background?: boolean,
  dropDups?: boolean,
  min?: number,
  max?: number,
  v?: number,
  expireAfterSeconds?: number,
  name?: number,
};

export type mongodb$WriteOptions = {
  w?: number | string,
  wtimeout?: number,
  j?: boolean,
  session?: ClientSession,
};

export type mongodb$IteratorCallback = (
  doc: Object
) => void;

export type mongodb$EndCallback = (
  err: ?MongoError
) => void;

export type mongodb$DbOptions = {
  authSource?: string,
  w?: number | string,
  wtimeout?: number,
  j?: boolean,
  forceServerObjectId?: boolean,
  serializeFunctions?: boolean,
  ignoreUndefined?: ?boolean,
  raw?: boolean,
  promoteLongs?: boolean,
  promoteBuffers?: boolean,
  bufferMaxEntries?: number,
  readPreference?: mongodb$ReadPreference,
  pkFactory?: any,
  promiseLibrary?: any,
  readConcern?: mongodb$ReadConcern,
};

type mongodb$AddUserOptions = mongodb$WriteConcern & {
  customData?: any,
  roles?: Array<any>,
  session?: ClientSession,
};

type mongodb$DbAggCallback = void;
type mongodb$CreateCollectionOptions = void;
type mongodb$CreateIndexOptions = void;

// TODO
type mongodb$AggPipeline = Array<any>;

type mongodb$DbAggOptions = {
  readPreference?: mongodb$ReadPreference,
  cursor?: { batchSize?: number },
  explain?: boolean,
  allowDiskUse?: boolean,
  maxTimeMS?: number,
  bypassDocumentValidation?: boolean,
  raw?: boolean,
  promoteLongs?: boolean,
  promoteValues?: boolean,
  promoteBuffers?: boolean,
  collation?: any,
  comment?: string,
  hint: any,
  session: ClientSession,
}

// TODO
type mongodb$DbCollectionOptions = {
};

export type mongodb$TransactionOptions = {
  readConcern?: mongodb$ReadConcern,
  writeConcern?: mongodb$WriteConcern,
  readPreference?: mongodb$ReadPreference,
};

declare module "mongodb" {
  declare export class Db {
    constructor(databaseName: string, topology: Topology, options?: mongodb$DbOptions): Db;
    serverConfig: Server | ReplSet | Mongos;
    bufferMaxEntries: number;
    databaseName: string;
    options: mongodb$DbOptions;
    native_parser: boolean;
    slaveOk: boolean;
    writeConcern: mongodb$WriteConcern;
    topology: Topology;

    addUser(username: string, password: string, options: mongodb$AddUserOptions, callback: (err: any, data: any) => void): void;
    addUser(username: string, password: string, options: mongodb$AddUserOptions): Promise<any>;

    admin(): Admin;

    aggregate(pipeline: mongodb$AggPipeline, options: mongodb$DbAggOptions, callback: mongodb$DbAggCallback): null | AggregationCursor;
    aggregate(pipeline: mongodb$AggPipeline, callback: mongodb$DbAggCallback): null | AggregationCursor;
    aggregate(callback: mongodb$DbAggCallback): null | AggregationCursor;

    collection(
      name: string,
      options?: mongodb$DbCollectionOptions,
      callback?: mongodb$CollectionResultsCallback
    ): Collection;

    collections(options?: { session: ClientSession }): Promise<Array<Collection>>;
    collections(options?: { session: ClientSession }, callback: (err: any, data: Array<Collection>) => void): void;

    command(
      command: any,
      options?: { readPreference?: mongodb$ReadPreference, session: ClientSession }
    ): Promise<any>;
    command(
      command: any,
      options?: { readPreference?: mongodb$ReadPreference, session: ClientSession },
      callback: (err: any, data: any) => void
    ): void;

    createCollection(
      name: string,
      options?: mongodb$CreateCollectionOptions,
      callback: mongodb$collectionResultCallback,
    ): void;
    createCollection(
      name: string,
      options: mongodb$CreateCollectionOptions,
    ): Promise<Collection>;

    createIndex(
      name: string,
      fieldOrSpec: any,
      options?: mongodb$CreateIndexOptions,
      callback: (err: any, idx: any) => void,
    ): void;
    createIndex(
      name: string,
      fieldOrSpec: any,
      options?: mongodb$CreateIndexOptions,
    ): Promise<data>;

    dropCollection(
      name: string,
      options?: { session?: ClientSession },
      callback: (err: any, ans: any) => void,
    ): void;
    dropCollection(
      name: string,
      options?: { session?: ClientSession },
    ): Promise<void>;

    // TODO
    // XXX XXX
    // XXX XXX
    // dropDatabase(
    //   options?: { session?: ClientSession },
    //   callback: (err: any, ans: any) => void,
    // ): void;
    // dropDatabase(
    //   options?: { session?: ClientSession },
    //   stream
    //   (options?: {
    //   transform?: any => any,
    // }): Cursor;
    // ): Promise<void>;

    // ensureIndex(
    //   name: string,
    //   fieldOrSpec: string | {},
    //   options?: mongodb$IndexCreateOptions &stream(options?: {
    //   transform?: any => any,
    // }): Cursor;
    //   callback: (err: any, ans: any) => voidstream(options?: {
    //   transform?: any => any,
    // }): Cursor;
    // );
    // ensureIndex(
    //   name: string,
    //   fieldOrSpec: string | {},
    //   options?: mongodb$IndexCreateOptions &stream(options?: {
    //   transform?: any => any,
    // }): Cursor;
    // ): Promise<void>;

    eval(
      code: string,
      parameters: Array<{}> | {},
      options: { nolock: boolean, session: ClientSession },
      callback: (err: any, ans: any) => void,
    ): void;
    eval(
      code: string,
      parameters: Array<{}> | {},
      options?: { nolock: boolean, session: ClientSession },
    ): Promise<any>;

    executeDbAdminCommand(
      command: {},
      options?: { readPreference?: mongodb$ReadPreference, session?: ClientSession },
      callback: (err: any, ans: any) => void,
    ): void;
    executeDbAdminCommand(
      command: {},
      options?: { readPreference?: mongodb$ReadPreference, session?: ClientSession },
    ): Promise<any>;

    indexInformation(
      name: string,
      options?: {
        full?: boolean,
        readPreference?: mongodb$ReadPreference,
        session?: ClientSession,
      },
      callback: (err: any, ans: any) => void,
    ): void;
    indexInformation(
      name: string,
      options?: {
        full?: boolean,
        readPreference?: mongodb$ReadPreference,
        session?: ClientSession,
      },
    ): Promise<any>;

    listCollections(
      filter: {},
      options?: {
        nameOnly?: boolean,
        batchSize: number,
        readPreference: mongodb$ReadPreference,
        session?: ClientSession,
      },
    ): CommandCursor;

    profilingLevel(
      options?: { session: ClientSession },
      callback: (err: any, ans: any) => void,
    ): void;
    profilingLevel(
      options?: { session: ClientSession },
    ): Promise<any>;

    removeUser(
      username: string,
      options?: mongodb$WriteConcert & { session?: ClientSession },
      callback: (err: any, ans: any) => void,
    ): void;
    removeUser(
      username: string,
      options?: mongodb$WriteConcert & { session?: ClientSession },
    ): Promise<any>;

    renameCollection(
      fromCollection: string,
      toCollection: string,
      options?: {
        dropTarget?: boolean,
        session?: ClientSession,
      },
      callback: (err: any, ans: any) => void,
    ): void;
    renameCollection(
      fromCollection: string,
      toCollection: string,
      options?: {
        dropTarget?: boolean,
        session?: ClientSession,
      },
    ): Promise<any>;

    setProfilingLevel(
      level: mongodb$ProfilingLevel,
      options?: { session?: ClientSession },
      callback: (err: any, ans: any) => void,
    ): void;
    setProfilingLevel(
      level: mongodb$ProfilingLevel,
      options?: { session?: ClientSession  },
    ): Promise<any>;

    stats(
      options?: {
        scale?: number,
        session?: ClientSession ,
      },
      callback: (err: any, ans: any) => void,
    ): void;
    stats(
      options?: {
        scale?: number,
        session?: ClientSession ,
      },
    ): Promise<any>;

    unref(): void;

    watch(
      pipeline?: Array<{}>,
      options?: {
        fullDocument?: 'default' | 'updateLookup',
        resumeAfter?: {},
        maxAwaitTimeMS?: number,
        batchSize?: number,
        collaction?: {}, // TODO ?!?!?!?
        readPreference?: mongodb$ReadPreference,
        startAtClusterTime?: Timestamp,
        session?: ClientSession ,
      },
    ): ChangeStream;


  }

  declare export class Binary {
    constructor(buffer: Buffer, subType: number): Binary; // TODO is this actually a constructor?!??!
    static SUBTYPE_BYTE_ARRAY: number;
    static SUBTYPE_DEFAULT: number;
    static SUBTYPE_FUNCTION: number;
    static SUBTYPE_MD5: number;
    static SUBTYPE_USER_DEFINED: number;
    static SUBTYPE_UUID: number;
    static SUBTYPE_UUID_OLD: number;

    length(): number;
    put(byte_value: string): void;
    read(position: number, length: number): Buffer;
    value(): string;
    write(string: Buffer | string, offset: number): null;
  }

  declare export class BSONRegExp { }


  declare export class BulkOperationBase implements BulkOpMarker {
    bulkExecute(
      bulk: UnorderedBulkOperation | OrderedBulkOperation,
      writeConcern: mongodb$WriteConcern,
      options: {},
      callback: (err: any, result: any) => void,
    ): void;
    finalOptionsHandler(
      config: {
        options: Object,
        batch: number,
        resultHandler: any,
      },
      callback: (...args: Array<any>) => void,
    ): void;
    find(selector: {}): any;
    handleWriteError(
      callback: (...args: Array<any>) => void,
      writeResult: mongodb$BulkWriteResult,
      self: UnorderedBulkOperation | OrderedBulkOperation,
    ): void;
    insert(doc: {}): OrderedBulkOperation | UnorderedBulkOperation;
    raw(op: Object): OrderedBulkOperation | UnorderedBulkOperation;
  }

  declare export class BulkWriteError extends MongoError {
    constructor(message: Error | string | Object);
  }

  declare export class ChangeStream extends stream$Readable {
    constructor(
      changeDomain: MongoClient | Db | Collection,
      pipeline: Array<Object>,
      options?: {
        fullDocument?: string,
        maxAwaitTimeMS?: number,
        resumeAfter?: Object,
        batchSize?: string,
        collation?: Object,
        readPreference?: mongodb$ReadPreference,
      }
    );

    close(callback: mongodb$ResultCallback): void;
    close(): Promise<any>;

    hasNext(callback: (err: MongoError, ans?: boolean) => void): void;
    hasNext(): Promise<boolean>;

    isClosed(): boolean;

    next(callback: mongodb$ResultCallback): void;
    next(): Promise<Object | null>;

    pause(): void;
    resume(): void;

    stream(options?: { transform?: (Object) => Object }): Cursor;
  }

  class ClientSession {
    abortTransaction(callback?: () => void);
    abortTransaction(): Promise<void>;

    advanceOperationTime(operationTime: Timestamp);

    commitTransaction(callback: () => void);
    commitTransaction(): Promise<void>;

    endSession(options?: Object, callback: () => void);

    equals(session?: ClientSession): boolean;

    incrementTransactionNumber();

    inTransaction(): Boolean;

    startTransaction(options: mongodb$TransactionOptions);

    withTransaction(
      fn: (session: ClientSession) => Promise<Object>,
      options: mongodb$TransactionOptions,
    )
  }

  declare export class Code {
    constructor(
      code: string | (arg: any) => void,
      scope: Object,
    )
  }

  declare export class MongoClient {
    constructor(
      url: string,
      options?: writeConcern & {
        poolSize?: number,
        ssl?: boolean,
        sslValidate?: boolean,
        sslCA?: Buffer,
        sslCert?: Buffer,
        sslKey?: Buffer,
        sslPass?: Buffer,
        sslCRL?: Buffer,
        autoReconnect?: boolean,
        noDelay?: boolean,
        keepAlive?: boolean,
        keepAliveInitialDelay?: number,
        connectTimeoutMS?: number,
        family?: number,
        socketTimeoutMS?: number,
        reconnectTries?: number,
        reconnectInterval?: number,
        ha?: boolean,
        haInterval?: number,
        replicaSet?: string,
        secondaryAcceptableLatencyMS?: number,
        acceptableLatencyMS?: number,
        connectWithNoPrimary?: boolean,
        authSource?: string,
        forceServerObjectId?: boolean,
        serializeFunctions?: boolean,
        ignoreUndefined?: boolean,
        raw?: boolean,
        bufferMaxEntries?: number,
        readPreference?: mongodb$ReadPreference | string,
        pkFactory?: Object,
        promiseLibrary?: Object,
        readConcern?: mongodb$ReadConcern,
        maxStalenessSeconds?: number,
        loggerLevel?: string,
        logger?: Object,
        promoteValues?: boolean,
        promoteBuffers?: boolean,
        promoteLongs?: boolean,
        domainsEnabled?: boolean,
        checkServerIdentity?: boolean | any,
        validateOptions?: Object,
        appname?: string,
        auth?: {
          user: string,
          password: string,
        },
        authMechanism?: string,
        compression?: Object,
        fsync?: boolean,
        readPreferenceTags?: Array<any>,
        numberOfRetries?: number,
        auto_reconnect?: boolean,
        minSize?: number,
      },
      callback?: (client: MongoClient) => void,
    );

    close(force: boolean, callback: (err: ?MongoError) => void);
    close(force: boolean): Promise<void>;

    connect(callback: (err: ?MongoError, client: MongoClient) => void);
    connect(): Promise<MongoClient>;

    db(
      dbName?: string,
      options?: {
        noListener?: boolean,
        returnNonCachedInstance?: boolean,
      }
    ): Db;

    isConnected(options?: {
      noListener?: boolean,
      returnNonCachedInstance?: boolean,
    }): boolean;

    startSession(options?: SessionOptions): ClientSession;

    watch(
      pipeline?: Array<Object>,
      options?: {
        fullDocument?: string,
        resumeAfter?: Object,
        maxAwaitTimeMS?: number,
        batchSize?: number,
        collation?: Object,
        readPreference?: mongodb$ReadPreference,
        startAtClusterTime?: Timestamp,
        session?: ClientSession,
      }
    ): ChangeStream;

    withSession(options?: Object, operation: (session: ClientSession) => void);
  };



  declare export class UnorderedBulkOperation extends BulkOperationBase {}
  declare export class OrderedBulkOperation extends BulkOperationBase {}

  declare export class Collection {
    collectionName: string,
    namespace: string,
    writeConcern: mongodb$WriteConcern,
    readConcern: mongodb$ReadConcern
    hint: Object,

    aggregate(
      pipeline?: Array<Object>,
      options?: mongodb$AggregateOptions,
      callback?: mongodb$AggregationCallback,
    );
    aggregate(
      pipeline?: Array<Object>,
      options?: mongodb$AggregateOptions,
    ): AggregationCursor | null;

    bulkWrite(
      operations: Array<Object>,
      options?: mongodb$WriteConcern & {
        serializeFunction?: boolean,
        ordered?: boolean,
        bypassDocumentValidation?: boolean,
        session?: ClientSession,
      },
      callback: (error: BulkWriteError, result?: mongodb$BulkWriteOpResult) => void,
    );
    bulkWrite(
      operations: Array<Object>,
      options?: mongodb$WriteConcern & {
        serializeFunction?: boolean,
        ordered?: boolean,
        bypassDocumentValidation?: boolean,
        session?: ClientSession,
      },
    ): Promise<mongodb$BulkWriteOpResult>;

  }

  declare export class Timestamp {
    static MAX_VALUE: Timestamp;
    static MIN_VALUE: Timestamp;
    static NEG_ONE: Timestamp;
    static ONE: Timestamp;
    static ZERO: Timestamp;
    static fromBits(lowBits: number, highBits: number): Timestamp;
    static fromInt(value: number): Timestamp;
    static fromNumber(value: number): Timestamp;
    static fromString(str: string, opt_radix: number): Timestamp;
    add(other: Timestamp): Timestamp;
    and(other: Timestamp): Timestamp;
    compare(other: Timestamp): Timestamp;
    div(other: Timestamp): Timestamp;
    equals(other: Timestamp): Timestamp;
    getHighBits(): number;
    getLowBits(): number;
    getLowBitsUnsigned(): number;
    getNumBitsAbs(): number;
    greaterThan(other: Timestamp): boolean;
    greaterThanOrEqual(other: Timestamp): boolean;
    isNegative(): boolean;
    isOdd(): boolean;
    isZero(): boolean;
    lessThan(other: Timestamp): boolean;
    lessThanOrEqual(other: Timestamp): boolean;
    modulo(other: Timestamp): Timestamp;
    multiply(other: Timestamp): Timestamp;
    negate(): Timestamp;
    not(): Timestamp;
    notEquals(other: Timestamp): boolean;
    or(other: Timestamp): Timestamp;
    shiftLeft(numBits: number): Timestamp;
    shiftRight(numBits: number): Timestamp;
    shiftRightUnsigned(numBits: number): Timestamp;
    subtract(other: Timestamp): Timestamp;
    toInt(): number;
    toJSON(): string;
    toNumber(): number;
    toString(opt_radix?: number): string;
    xor(other: Timestamp): Timestamp;

  }

  declare export class CommandCursor extends stream$Readable {
    batchSize(value: number): CommandCursor;
    clone(): CommandCursor;
    close(cb: mongodb$ResultCallback);
    close(): Promise<Object>;
    each(cb: mongodb$ResultCallback);
    hasNext(cb: mongodb$ResultCallback);
    isClosed(): boolean;
    maxTimeMS(value: number): CommandCursor;
    next(mongodb$ResultCallback);
    next(): Promise<Object>;
    setReadPreference(mongodb$ReadPreference): CommandCursor;
    toArray(cb: (err: ?MongoError, docs: Array<Object>) => void);
    toArray(): Promise<Array<Object>>
  };

  declare export class Cursor extends stream$Readable {
    addCursorFlag(flag: mongodb$CursorFlag, value: boolean): Cursor;
    addQueryModifier(name: string, value: string | boolean | number): Cursor;
    batchSize(val: numebr): Cursor;
    clone(): Cursor;
    close(options?: { skipKillCursors?: boolean }, cb: mongodb$ResultCallback);
    close(options?: { skipKillCursors?: boolean }): Promise<Object>;
    collation(value: Object): Cursor;
    comment(val: string): Cursor;
    count(
      applySkipLimit?: boolean,
      options?: {
        skip?: number,
        limit?: number,
        maxTimeMS?: number,
        hint?: string,
        readPreference?: mongodb$ReadPreference,
      },
      cb: (err: ?MongoError, count: number) => void,
    );
    count(
      applySkipLimit?: boolean,
      options?: {
        skip?: number,
        limit?: number,
        maxTimeMS?: number,
        hint?: string,
        readPreference?: mongodb$ReadPreference,
      }
    ): Promise<Object>;

    each(cb: mongodb$ResultCallback);
    explain(cb: mongodb$ResultCallback);
    explain(): Promise<Object>;
    filter(filter: Object): Cursor;
    forEach(itCb: mongodb$IteratorCallback, endCb: mongodb$EndCallback);
    hasNext(cb: mongodb$ResultCallback);
    hasNext(): Promise<boolean>;
    hint(hint: Object): Cursor;
    isClosed(): boolean;
    limit(value: number): Cursor;
    map(transform?: (any) => any): Cursor;
    max(max: Object): Cursor;
    maxAwaitTimeMS(value: number): Cursor;
    maxScan(maxScan: Object): Cursor;
    maxTimeMS(value: number): Cursor;
    min(min: Object): Cursor;
    next(cb: mongodb$ResultCallback);
    next(): Promise<Object>;
    project(value: Object): Cursor;
    returnKey(retKey: boolean): Cursor;
    setCursorOption(
      field: "numberOfRetries" | "tailableRetryInterval",
      value: string
    ): Cursor;
    setReadPreference(rp: mongodb$ReadPreference): Cursor;
    showRecordId(showRecordId: Object): Cursor;
    skip(value: number): Cursor;
    snapshot(snapshot: Object): Cursor;
    sort(keyOrList: string | Array<Object> | Object, direction?: -1 | 1): Cursor;
    stream(options?: {
      transform?: any => any,
    }): Cursor;
    toArray(cb: mongodb$ToArrayResultCallback);
    toArray(): Promise<Array<ObjecT>>;
    transformStream(options?: {
      transform?: any => any,
    }): Cursor;
  }

  declare export class AggregationCursor extends stream$Readable {
    constructor() {}
    batchSize(value: number): AggregationCursor;
    clone(): AggregationCursor;
    close(callback: mongodb$AggResultCallback);
    close(): Promise<{} | null>;
    each(callback: mongodb$AggResultCallback): null;
    explain(callback: mongodb$AggResultCallback);
    explain(): Promise<{} | null>,
    geoNear(document: {}): AggregationCursor,
    group(document: {}): AggregationCursor,
    hasNext(callback: mongodb$AggResultCallback);
    hasNext(): Promise<{} | null>;
    isClosed(): boolean;
    limit(value: number): AggregationCursor;
    lookup(document: {}): AggregationCursor;
    match(document: {}): AggregationCursor;
    maxTimeMS(value: number): AggregationCursor;
    next(callback: mongodb$AggResultCallback);
    next(): Promise<{} | null>;
    out(destination: number): AggregationCursor;
    project(document: {}): AggregationCursor;
    redact(document: {}): AggregationCursor;
    skip(value: number): AggregationCursor;
    sort(document: {}): AggregationCursor;
    toArray(callback: mongodb$ToArrayResultCallback);
    toArray(): Promise<Array<{}>>;
    unwind(field: number): AggregationCursor;
  }

  declare export class DBRef {
    constructor(namespace: string, oid: ObjectID, db?: string);
  }

  declare export class Decimal128 {
    constructor(bytes: Buffer);
    toString(): string;
    statuc fromString(input: string): Decimal128;
  }

  declare export class Double {
    constructor(value: double);
    valueOf(): number;
  }

  declare type BulkOp = UnorderedBulkOperation | OrderedBulkOperation
  declare export class FindOperators<T: BulkOp> {
    constructor(bulkOperation: T);
    delete(): T;
    deleteOne(): T;
    remove();
    removeOne();
    replaceOne(updateDocument: Object): T;
    update(updateDocument: Object): T;
    updateOne(updateDocument): T;
    upsert(): FindOperators;
  }

  declare export class GridFSBucket {
    constructor(db: Db, options?: {
      bucketName?: string,
      chunkSizeBytes?: number,
      writeConcern?: mongodb$WriteConcern,
      readPreference?: mongodb$ReadConcern,
    });

    delete(id: ObjectID, cb: mongodb$ErrorCallback);
    drop(cb: mongodb$ErrorCallback);
    find(filter: Object, options?: {
      batchSize?: number,
      limit?: number,
      maxTimeMS?: number,
      noCursorTimeout?: boolean,
      skip?: number,
      sort?: Object,
    }): Cursor;
    openDownloadStream(
      id: ObjectID,
      options?: {
        start?: number,
        end?: number,
      }
    ): GridFSBucketReadStream;
    openDownloadStreamByName(
      filename: string,
      options?: {
        revision?: number,
        start?: number,
        end?: number,
      }
    ): GridFSBucketReadStream;

    openUploadStream(
      filename: string,
      options?: {
        chunkSizeBytes?: number,
        metadata?: Object,
        contentType?: string,
        aliases?: Array<string>,
        disableMD5?: boolean,
      }
    ): GridFSBucketWriteStream;
    openUploadStreamWithId(
      id: string | number | ObjectID,
      filename: string,
      options?: {
        chunkSizeBytes?: number,
        metadata?: Object,
        contentType?: string,
        aliases?: Array<string>,
        disableMD5?: boolean,
      }
    ): GridFSBucketWriteStream;
    rename(id: ObjectID, filename: string, callback: mongodb$ErrorCallback);
  }

  declare export class GridFSBucketReadStream extends stream$Readable {
    abort(cb: mongodb$ErrorCallback);
    end(end: number): GridFSBucketReadStream;
    start(start: number): GridFSBucketReadStream;
  }

  declare export class GridFSBucketWriteStream extends stream$Writeable {
    abort(cb: mongodb$ErrorCallback);
    abort(): Promise<void>;
    end(chunk: Buffer, encoding: string, cb: mongodb$ErrorCallback);
  }

  declare export class Int32 {
    constructor(value: number);
    valueOf(): number;
  }

  declare export class Long {
    constructor(low: number, high: number);

    static MAX_VALUE: Long;
    static MIN_VALUE: Long;
    static NEG_ONE: Long;
    static ONE: Long;
    static ZERO: Long;

    static fromBits(lowBite: number, highBits: number): Long;
    static fromInt(value: number): Long;
    static fromNumber(value: number): Long;
    static fromString(str: string, opt_radix: number): Long;

    add(other: Long): Long;
    and(other: Long): Long;
    compare(other: Long): number;
    div(other: Long): Long;
    equals(other: Long): boolean;
    getHighBits(): number;
    getLowBits(): number;
    getLowBitsUnsigned(): number;
    getNumBitsAbs(): number;
    greaterThan(other: Long): boolean;
    greaterThanOrEqual(other: Long): boolean;
    isNegative(): boolean;
    isOdd(): boolean;
    isZero(): boolean;
    lessThan(other: Long): boolean;
    lessThanOrEqual(other: Long): boolean;
    modulo(other: Long): Long;
    multiply(other: Long): Long;
    negate(): Long;
    not(): Long;
    notEquals(other: Long): boolean;
    or(other: Long): Long;
    shiftLeft(numBits: number): Long;
    shiftRight(numBits: number): Long;
    shiftRightUnsigned(numBits: number): Long;
    subtract(other: Long): Long;
    toInt(): number;
    toJSON(): string;
    toNumber(): number;
    toString(radix: number): string;
    xor(other: Long): Long;
  }

  declare export class MaxKey {
    constructor();
  }

  declare export class MinKey {
    constructor();
  }

  declare export class Admin {

    constructor() {
    }

    addUser(
      username: string,
      password: string,
      options?: mongodb$WriteConcern & {
        fsync?: boolean,
        customData?: {},
        roles?: Array<{}>,
        session: ClientSession ,
      },
      callback: mongodb$ResultCallback,
    );
    addUser(
      username: string,
      password: string,
      options?: mongodb$WriteConcern & {
        fsync?: boolean,
        customData?: {},
        roles?: Array<{}>,
        session: ClientSession ,
      },
    ): Promise<{}>;

    buildInfo(
      options?: { session?: ClientSession  },
      callback: mongodb$ResultCallback,
    );
    buildInfo(
      options?: { session?: ClientSession  },
    ): Promise<{}>;

    command(
      command: {},
      options?: {
        readPreference?: mongodb$ReadPreference,
        maxTimeMS?: number,
      },
      callback: w,
    );
    command(
      command: {},
      options?: {
        readPreference?: mongodb$ReadPreference,
        maxTimeMS?: number,
      },
    ): Promise<{}>;

    listDatabases(
      options?: {
        nameOnly?: boolean,
        session?: ClientSession,
      },
      callback: mongodb$ResultCallback,
    );
    listDatabases(
      options?: {
        nameOnly?: boolean,
        session?: ClientSession,
      },
    ): Promise<{}>;

    ping(
      options?: { session: ClientSession  }
      callback: mongodb$ResultCallback,
    );
    ping(
      options?: { session: ClientSession  }
    ): Promise<{}>;

    removeUser(
      username: string,
      options?: mongodb$WriteConcern & {
        fsync?: boolean,
        session?: ClientSession ,
      },
      callback: mongodb$ResultCallback,
    );
    removeUser(
      username: string,
      options?: mongodb$WriteConcern & {
        fsync?: boolean,
        session?: ClientSession ,
      },
    ): Promise<{}>;

    replSetGetStatus(
      options?: {
        session?: ClientSession ,
      },
      callback: mongodb$ResultCallback,
    );
    replSetGetStatus(
      options?: {
        session?: ClientSession ,
      },
    ): Promise<{}>;

    serverInfo(
      options?: { session?: ClientSession  },
      callback: mongodb$ResultCallback,
    );
    serverInfo(
      options?: { session?: ClientSession  },
    ): Promise<{}>;

    serverStatus(
      options?: { session?: ClientSession  },
      callback: mongodb$ResultCallback,
    );
    serverStatus(
      options?: { session?: ClientSession  },
    ): Promise<{}>;

    validateCollection(
      collectionName: string,
      options?: { session?: ClientSession  },
      callback: mongodb$ResultCallback,
    );
    validateCollection(
      collectionName: string,
      options?: { session?: ClientSession  },
    ): Promise<{}>;
  }

  declare export class MongoError extends Error {
    constructor(message: Error | string | Object);
    message: string;
    stack: string;

    static create(options: Error | string | Object): MongoError;
  }

  declare export class MongoNetworkError extends MongoError {};
  declare export class MongoParseError extends MongoError {};
  declare export class MongoTimeoutError extends MongoError {};
  declare export class MongoWriteConcernError extends Error {
    constructor(message: Error | string | Object, result?: Object);
    message: string;
    result: Object;
  };

  declare export class WriteConcernError {
    code: any;
    errmsg: string;
    toJSON(): Object;
    toString(): string;
  }


  declare export class ReplSet extends EventEmitter {
    parserType: string;
    constructor(servers: Array<Server>, options?: {
      ha?: boolean,
      haInterval?: number,
      replicaSet?: string,
      secondaryAcceptableLatencyMS?: number,
      connectWithNoPrimary?: boolean,
      poolSize?: number,
      ssl?: boolean,
      checkServerIdentity?: boolean | (any) => boolean,
      sslValidate?: boolean,
      sslCA?: boolean,
      sslCRL?: boolean,
      sslCert?: Buffer | string,
      ciphers?: string,
      sslKey?: Buffer | string,
      sslPass?: Buffer | string,
      servername?: string,
      socketOptions?: {
        noDelay?: boolean,
        keepAlive?: boolean,
        keepAliveInitialDelay?: number,
        connectTimeoutMS?: number,
        socketTimeoutMS?: number
      },
      domainsEnabled?: boolean,
      maxStalenessSeconds?: number,
      monitorCommands?: boolean,
    });
  }

  declare export class Server extends EventEmitter {
    parserType: string;
    constructor(host: string, port?: number, options?: mongodb$SocketOptions | {
      poolSize?: number,
      ssl?: boolean,
      sslValidate?: boolean,
      sslCA?: boolean,
      sslCRL?: boolean,
      sslCert?: Buffer | string,
      ciphers?: string,
      sslKey?: Buffer | string,
      sslPass?: Buffer | string,
      ecdhCurve?: string,
      servername?: string,
      reconnectTries?: number,
      reconnectInterval?: number,
      monitoring?: boolean,
      haInterval?: number,
      domainsEnabled?: boolean,
      monitorCommands?: boolean
    })
  }

  declare export class Symbol {
    constructor(value: string);
    valueOf(): string;
  }

  declare export class Mongos extends EventEmitter {
    constructor(
      servers: Array<Server>,
      options?: {
        ha?: boolean,
        haInterval?: number,
        poolSize?: number,
        acceptableLatencyMS?: number,
        ssl?: boolean,
        checkServerIdentity?: boolean | (server: Server) => boolean,
        sslValidate?: boolean,
        sslCA?: Array<string | Buffer>,
        sslCRL?: Array<string | Buffer>,
        ciphers?: string,
        ecdhCurve?: string,
        sslCert?: Buffer | string,
        sslKey?: Buffer | string,
        sslPass?: Buffer | string,
        servername?: string,
        socketOptions?: {
          noDelay?: boolean,
          keepAlive?: boolean,
          keepAliveInitialDelay?: number,
          connectTimeoutMS?: number,
          socketTimeoutMS?: number,
        },
        domainsEnabled?: boolean,
        monitorCommands?: boolean,
      }
    )

    parserType: string;

  }

  declare export class ObjectID {
    constructor(id: string | number | ObjectID);
    generationTime: number;
    static createFromHexString(hexString: string): ObjectID;
    static createFromTime(time: number): ObjectID;
    static isValid(id: ObjectID): boolean;
    equals(otherID: ObjectID): boolean;
    generate(time?: number): Buffer;
    getTimestamp(): Date;
    toHexString(): string;
  }
}
