import { EventEmitter } from "events";
import { Session } from "inspector";

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



// TODO
type mongodb$DbCollectionOptions = {
};


declare module "mongodb" {
  declare export class Db {
    constructor(databaseName: string, topology: Object, options?: DbOptions): Db;
    serverConfig: Server | ReplSet | Mongos;
    bufferMaxEntries: number;
    databaseName: string;
    options: DbOptions;
    native_parser: boolean;
    slaveOk: boolean;
    writeConcern: WriteConcern;
    topology: Object;

    addUser(username: string, password: string, options: AddUserOptions, callback: (err: any, data: any) => void): void;
    addUser(username: string, password: string, options: AddUserOptions): Promise<any>;

    admin(): Admin;

    collection(
      name: string,
      options?: mongodb$DbCollectionOptions,
      callback?: CollectionResultsCallback
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
      options?: CreateCollectionOptions,
      callback: CollectionResultsCallback,
    ): void;
    createCollection(
      name: string,
      options: CreateCollectionOptions,
    ): Promise<Collection>;

    createIndex(
      name: string,
      fieldOrSpec: any,
      options?: CreateIndexOptions,
      callback: (err: any, idx: any) => void,
    ): void;
    createIndex(
      name: string,
      fieldOrSpec: any,
      options?: CreateIndexOptions,
    ): Promise<Object>;

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
    //   options?: IndexCreateOptions &stream(options?: {
    //   transform?: any => any,
    // }): Cursor;
    //   callback: (err: any, ans: any) => voidstream(options?: {
    //   transform?: any => any,
    // }): Cursor;
    // );
    // ensureIndex(
    //   name: string,
    //   fieldOrSpec: string | {},
    //   options?: IndexCreateOptions &stream(options?: {
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
      options?: WriteConcern & { session?: ClientSession },
      callback: (err: any, ans: any) => void,
    ): void;
    removeUser(
      username: string,
      options?: WriteConcern & { session?: ClientSession },
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


  declare export class BulkOperationBase {
    bulkExecute(
      bulk: UnorderedBulkOperation | OrderedBulkOperation,
      writeConcern: WriteConcern,
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
    constructor(message: Error | string | Object): BulkWriteError;
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
    ): ChangeStream;

    close(callback: ResultCallback): ChangeStream;
    close(): Promise<any>;

    hasNext(callback: (err: MongoError, ans?: boolean) => void): void;
    hasNext(): Promise<boolean>;

    isClosed(): boolean;

    next(callback: ResultCallback): void;
    next(): Promise<Object | null>;

    stream(options?: { transform?: (Object) => Object }): Cursor;
  }

  declare export class ClientSession {
    abortTransaction(callback?: () => void): void;
    abortTransaction(): Promise<void>;

    advanceOperationTime(operationTime: Timestamp): void;

    commitTransaction(callback: () => void): void;
    commitTransaction(): Promise<void>;

    endSession(options?: Object, callback: () => void): void;

    equals(session?: ClientSession): boolean;

    incrementTransactionNumber(): void;

    inTransaction(): Boolean;

    startTransaction(options: TransactionOptions): void;

    withTransaction(
      fn: (session: ClientSession) => Promise<Object>,
      options: TransactionOptions,
    ): void;
  }

  declare export class Code {
    constructor(
      code: string | (arg: any) => void,
      scope: Object,
    ): Code;
  }

  declare export class MongoClient {
    constructor(
      url: string,
      options?: WriteConcern & {
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
    ): MongoClient;

    close(force: boolean, callback: (err: ?MongoError) => void): void;
    close(force: boolean): Promise<void>;

    connect(callback: (err: ?MongoError, client: MongoClient) => void): void;
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

    withSession(options?: Object, operation: (session: ClientSession) => void): void;
  }



  declare export class UnorderedBulkOperation extends BulkOperationBase {}
  declare export class OrderedBulkOperation extends BulkOperationBase {}

  declare export class Collection {
    collectionName: string;
    namespace: string;
    writeConcern: WriteConcern;
    readConcern: mongodb$ReadConcern;
    hint: Object;

    aggregate(
      pipeline?: Array<Object>,
      options?: AggregateOptions,
      callback?: AggregationCallback,
    ): void;
    aggregate(
      pipeline?: Array<Object>,
      options?: AggregateOptions,
    ): AggregationCursor | null;

    bulkWrite(
      operations: Array<Object>,
      options?: WriteConcern & {
        serializeFunction?: boolean,
        ordered?: boolean,
        bypassDocumentValidation?: boolean,
        session?: ClientSession,
      },
      callback: (error: BulkWriteError, result?: mongodb$BulkWriteOpResult) => void,
    ): void;
    bulkWrite(
      operations: Array<Object>,
      options?: WriteConcern & {
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
    close(cb: ResultCallback): void;
    close(): Promise<Object>;
    each(cb: ResultCallback): void;
    hasNext(cb: ResultCallback): void; // XXX
    isClosed(): boolean;
    maxTimeMS(value: number): CommandCursor;
    next(ResultCallback): void; // XXX
    next(): Promise<Object>;
    setReadPreference(mongodb$ReadPreference): CommandCursor;
    toArray(cb: (err: ?MongoError, docs: Array<Object>) => void): void;
    toArray(): Promise<Array<Object>>;
  }

  declare export class Cursor extends stream$Readable {
    addCursorFlag(flag: mongodb$CursorFlag, value: boolean): Cursor;
    addQueryModifier(name: string, value: string | boolean | number): Cursor;
    batchSize(val: number): Cursor;
    clone(): Cursor;
    close(options?: { skipKillCursors?: boolean }, cb: ResultCallback): void;
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
    ): void;
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

    each(cb: ResultCallback): void; // XXX
    explain(cb: ResultCallback): void;
    explain(): Promise<Object>;
    filter(filter: Object): Cursor;
    forEach(itCb: IteratorCallback, endCb: EndCallback): void;
    hasNext(cb: ResultCallback): void; // XXX
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
    next(cb: ResultCallback): void;
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
    toArray(cb: ToArrayResultCallback): void;
    toArray(): Promise<Array<Object>>;
    transformStream(options?: {
      transform?: any => any,
    }): Cursor;
  }

  declare export class AggregationCursor extends stream$Readable {
    batchSize(value: number): AggregationCursor;
    clone(): AggregationCursor;
    close(callback: AggResultCallback): void;
    close(): Promise<Object | null>;
    each(callback: AggResultCallback): void;
    explain(callback: AggResultCallback): void;
    explain(): Promise<Object | null>,
    geoNear(document: Object): AggregationCursor,
    group(document: Object): AggregationCursor,
    hasNext(callback: AggResultCallback): void;
    hasNext(): Promise<Object | null>;
    isClosed(): boolean;
    limit(value: number): AggregationCursor;
    lookup(document: {}): AggregationCursor;
    match(document: {}): AggregationCursor;
    maxTimeMS(value: number): AggregationCursor;
    next(callback: AggResultCallback): void;
    next(): Promise<Object | null>;
    out(destination: number): AggregationCursor;
    project(document: {}): AggregationCursor;
    redact(document: {}): AggregationCursor;
    skip(value: number): AggregationCursor;
    sort(document: {}): AggregationCursor;
    toArray(callback: ToArrayResultCallback): void;
    toArray(): Promise<Array<Object>>;
    unwind(field: number): AggregationCursor;
  }

  declare export class DBRef {
    constructor(namespace: string, oid: ObjectID, db?: string): DBRef;
  }

  declare export class Decimal128 {
    constructor(bytes: Buffer): Decimal128;
    toString(): string;
    static fromString(input: string): Decimal128;
  }

  declare export class Double {
    constructor(value: number): Double;
    valueOf(): number;
  }

  declare type BulkOp = UnorderedBulkOperation | OrderedBulkOperation;
  declare export class FindOperators<T: BulkOp> {
    constructor(bulkOperation: T): FindOperators<T>;
    delete(): T;
    deleteOne(): T;
    remove(): void;
    removeOne(): void;
    replaceOne(updateDocument: Object): T;
    update(updateDocument: Object): T;
    updateOne(updateDocument: Object): T;
    upsert(): FindOperators<T>;
  }

  declare export class GridFSBucket {
    constructor(db: Db, options?: {
      bucketName?: string,
      chunkSizeBytes?: number,
      writeConcern?: WriteConcern,
      readPreference?: mongodb$ReadConcern,
    }): GridFSBucket;

    delete(id: ObjectID, cb: ErrorCallback): void;
    drop(cb: ErrorCallback): void;
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
    rename(id: ObjectID, filename: string, callback: ErrorCallback): void;
  }

  declare export class GridFSBucketReadStream extends stream$Readable {
    abort(cb: ErrorCallback): void;
    end(end: number): GridFSBucketReadStream;
    start(start: number): GridFSBucketReadStream;
  }

  declare export class GridFSBucketWriteStream extends stream$Writable {
    abort(cb: ErrorCallback): void;
    abort(): Promise<void>;
  }

  declare export class Int32 {
    constructor(value: number): Int32;
    valueOf(): number;
  }

  declare export class Long {
    constructor(low: number, high: number): Long;

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
    constructor(): MaxKey;
  }

  declare export class MinKey {
    constructor(): MinKey;
  }

  declare export class Admin {

    constructor(): Admin;

    addUser(
      username: string,
      password: string,
      options?: ResultCallback | WriteConcern & {
        fsync?: boolean,
        customData?: {},
        roles?: Array<{}>,
        session: ClientSession ,
      },
      callback?: ResultCallback,
    ): void;
    addUser(
      username: string,
      password: string,
      options?: WriteConcern & {
        fsync?: boolean,
        customData?: {},
        roles?: Array<{}>,
        session: ClientSession ,
      },
    ): Promise<Object>;

    buildInfo(
      options?: { session?: ClientSession  },
      callback: ResultCallback,
    ): void;
    buildInfo(
      options?: { session?: ClientSession  },
    ): Promise<Object>;

    command(
      command: {},
      options?: {
        readPreference?: mongodb$ReadPreference,
        maxTimeMS?: number,
      },
      callback: ResultCallback,
    ): void;
    command(
      command: {},
      options?: {
        readPreference?: mongodb$ReadPreference,
        maxTimeMS?: number,
      },
    ): Promise<Object>;

    listDatabases(
      options?: {
        nameOnly?: boolean,
        session?: ClientSession,
      },
      callback: ResultCallback,
    ): void;
    listDatabases(
      options?: {
        nameOnly?: boolean,
        session?: ClientSession,
      },
    ): Promise<Object>;

    ping(
      options?: { session: ClientSession  },
      callback: ResultCallback,
    ): void;
    ping(
      options?: { session: ClientSession  },
    ): Promise<Object>;

    removeUser(
      username: string,
      options?: WriteConcern & {
        fsync?: boolean,
        session?: ClientSession ,
      },
      callback: ResultCallback,
    ): void;
    removeUser(
      username: string,
      options?: WriteConcern & {
        fsync?: boolean,
        session?: ClientSession,
      },
    ): Promise<Object>;

    replSetGetStatus(
      options?: {
        session?: ClientSession,
      },
      callback: ResultCallback,
    ): void;
    replSetGetStatus(
      options?: {
        session?: ClientSession,
      },
    ): Promise<Object>;

    serverInfo(
      options?: { session?: ClientSession  },
      callback: ResultCallback,
    ): void;
    serverInfo(
      options?: { session?: ClientSession  },
    ): Promise<Object>;

    serverStatus(
      options?: { session?: ClientSession  },
      callback: ResultCallback,
    ): void;
    serverStatus(
      options?: { session?: ClientSession  },
    ): Promise<Object>;

    validateCollection(
      collectionName: string,
      options?: { session?: ClientSession  },
      callback: ResultCallback,
    ): void;
    validateCollection(
      collectionName: string,
      options?: { session?: ClientSession  },
    ): Promise<Object>;
  }

  declare export class MongoError extends Error {
    constructor(message: Error | string | Object): MongoError;
    message: string;
    stack: string;

    static create(options: Error | string | Object): MongoError;
  }

  declare export class MongoNetworkError extends MongoError {}
  declare export class MongoParseError extends MongoError {}
  declare export class MongoTimeoutError extends MongoError {}
  declare export class MongoWriteConcernError extends Error {
    constructor(message: Error | string | Object, result?: Object): MongoWriteConcernError;
    message: string;
    result: Object;
  }

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
    }): ReplSet;
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
    }): Server;
  }

  declare export class Symbol {
    constructor(value: string): Symbol;
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
    ): Mongos;

    parserType: string;

  }

  declare export class ObjectID {
    constructor(id: string | number | ObjectID): ObjectID;
    generationTime: number;
    static createFromHexString(hexString: string): ObjectID;
    static createFromTime(time: number): ObjectID;
    static isValid(id: ObjectID): boolean;
    equals(otherID: ObjectID): boolean;
    generate(time?: number): Buffer;
    getTimestamp(): Date;
    toHexString(): string;
  }

  declare type SessionOptions = {
    causalConsistency?: boolean,
    defaultTransactionOptions?: TransactionOptions,
  }
  
  declare type WriteConcern = {
    w?: number | "majority",
    j?: boolean,
    wtimeout?: number,
  }

  declare type AddUserOptions = WriteConcern & {
    customData?: any,
    roles?: Array<any>,
    session?: ClientSession,
  };

  declare type TransactionOptions = {
    readConcern?: mongodb$ReadConcern,
    writeConcern?: WriteConcern,
    readPreference?: mongodb$ReadPreference,
  };
  
  declare type AggregateOptions = {
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

  // declare type WriteOptions = {
  //   w?: number | string,
  //   wtimeout?: number,
  //   j?: boolean,
  //   session?: ClientSession,
  // };
  
  declare type DbOptions = {
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
  
  declare type IndexCreateOptions = {
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
  
  // TODO
  declare type mongodb$AggPipeline = Array<any>;
  
  declare type DbAggOptions = {
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

  declare type CreateIndexOptions = WriteConcern & {
    unique?: boolean,
    sparse?: boolean,
    background?: boolean,
    dropDups?: boolean,
    min?: number,
    max?: number,
    v?: number,
    expireAfterSeconds?: number,
    name?: string | number,
    partialFilterExpression?: {}, // XXX
    session?: Session
  }

  declare type CreateCollectionOptions = WriteConcern & {
    raw?: boolean,
    pkFactory?: {}, // XXX
    readPreference?: mongodb$ReadPreference | string,
    serializeFunctions?: boolean,
    strict?: boolean,
    capped?: boolean,
    autoIndexId?: boolean,
    size?: number,
    max?: number,
    flags?: number,
    storageEngine?: {},
    validator?: {},
    validationLevel?: string,
    validationAction?: string,
    indexOptionDefaults?: {},
    viewOn?: string,
    pipeling?: Array<Object>,
    collation?: {}, // XXX
    session?: ClientSession
  }

  // TODO maybe add type param?
  declare type ResultCallback = (error: ?MongoError, result: any) => void;
  declare type AggResultCallback = (error: ?MongoError, result: Object) => void;
  declare type CollectionResultsCallback = (err: ?MongoError, collection: Collection) => void;
  declare type ErrorCallback = (err: ?MongoError) => void;
  declare type AggregationCallback = (error: ?MongoError, cursor: AggregationCursor) => void;
  declare type EndCallback = (err: ?MongoError) => void;
  declare type IteratorCallback = (doc: Object) => void;
  declare type ToArrayResultCallback = (err: ?MongoError, documents: Array<Object>) => any;
}