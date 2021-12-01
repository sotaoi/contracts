declare class Artifact {
  public domainSignature: string;
  public repository: string;
  public uuid: string;
  public pocket: { [key: string]: any };
  public ref: RecordRef;
  public serial: string;

  constructor(domainSignature: string, repository: string, uuid: string, pocket: { [key: string]: any });

  public setPocket(pocket: { [key: string]: any }): this;

  public deserialize(value: string | object | Artifact): Artifact;

  public serialize(): string;

  public static deserialize(value: string | object | Artifact): Artifact;
}

declare class AuthRecord extends Artifact {
  public createdAt: Date;
  public active: boolean;
  public pocket: { [key: string]: any };
  public siblings: null | Artifact[]; // <-- siblings for multi (artifact) auth

  constructor(
    domainSignature: string,
    repository: string,
    uuid: string,
    createdAt: Date,
    active: boolean,
    pocket: { [key: string]: any }
  );

  public deserialize(value: string | AuthRecord): AuthRecord;

  public serialize(): string;

  public static deserialize(value: string | object | AuthRecord): AuthRecord;
}

declare class RecordRef {
  public repository: string;
  public uuid: string;

  constructor(repository: string, uuid: string);

  public isEmpty(): boolean;

  public deserialize(value: string | RecordRef): RecordRef;

  public serialize(): string;

  public static deserialize(value: string | object | RecordRef): RecordRef;

  public static fromRecordEntry(recordEntry: RecordEntry): RecordRef;
}

declare class Record {
  [key: string]: any;
  public uuid: string;

  constructor(data: { uuid: string; [key: string]: any });

  public static make(data: any): Record;
}

declare class RecordEntry extends Record {
  public __repository__: string;

  constructor(repository: string, uuid: string, data: { [key: string]: any });
}

declare class Artifacts {
  public child: null | Artifact;
  public parent: null | Artifact;
  public subject: null | Artifact;
  public inviter: null | Artifact;
  public invitee: null | Artifact;
  public agent: null | Artifact;
  public target: null | Artifact;
  public children: null | Artifact[];
  public parents: null | Artifact[];
  public subjects: null | Artifact[];
  public inviters: null | Artifact[];
  public invitees: null | Artifact[];
  public agents: null | Artifact[];
  public targets: null | Artifact[];
  // list A, B, C, D

  constructor(artifacts?: {
    child?: null | Artifact;
    parent?: null | Artifact;
    subject?: null | Artifact;
    inviter?: null | Artifact;
    invitee?: null | Artifact;
    agent?: null | Artifact;
    target?: null | Artifact;
    children?: Artifact[];
    parents?: Artifact[];
    subjects?: Artifact[];
    inviters?: Artifact[];
    invitees?: Artifact[];
    agents?: Artifact[];
    targets?: Artifact[];
  });
}

export { Artifact, AuthRecord, Record, RecordRef, RecordEntry, Artifacts };
