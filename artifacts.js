class Artifact {
  constructor(domainSignature, repository, uuid, pocket) {
    this.domainSignature = domainSignature;
    this.repository = repository;
    this.uuid = uuid;
    this.pocket = pocket;
    this.ref = new RecordRef(repository, uuid);
    this.serial = this.serialize();
  }

  setPocket(pocket) {
    this.pocket = pocket;
    return this;
  }

  deserialize(value) {
    if (value instanceof Artifact) {
      return value;
    }

    return Artifact.deserialize(value);
  }

  serialize() {
    return JSON.stringify({
      domainSignature: this.domainSignature,
      repository: this.repository,
      uuid: this.uuid,
      pocket: this.pocket,
    });
  }

  static deserialize(value) {
    if (value instanceof Artifact) {
      return value;
    }

    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    if (
      typeof parsed !== 'object' ||
      typeof parsed.domainSignature !== 'string' ||
      typeof parsed.repository !== 'string' ||
      typeof parsed.uuid !== 'string'
    ) {
      throw new Error('failed to parse artifact');
    }
    return new Artifact(
      parsed.domainSignature,
      parsed.repository,
      parsed.uuid,
      typeof parsed.pocket === 'object' ? parsed.pocket : {}
    );
  }
}

class AuthRecord extends Artifact {
  constructor(domainSignature, repository, uuid, createdAt, active, pocket) {
    super(domainSignature, repository, uuid, pocket);

    this.repository = repository;
    this.uuid = uuid;
    this.createdAt = createdAt;
    this.active = active;
    this.pocket = pocket;
    this.siblings = null; // <-- siblings for multi (artifact) auth
    this.serial = this.serialize();
  }

  deserialize(value) {
    if (value instanceof AuthRecord) {
      return value;
    }

    return AuthRecord.deserialize(value);
  }

  serialize() {
    return JSON.stringify({
      domainSignature: this.domainSignature,
      repository: this.repository,
      uuid: this.uuid,
      createdAt: this.createdAt,
      active: this.active,
      pocket: this.pocket,
    });
  }

  static deserialize(value) {
    if (value instanceof AuthRecord) {
      return value;
    }

    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    typeof parsed.createdAt === 'string' && (parsed.createdAt = new Date(parsed.createdAt));
    if (
      typeof parsed !== 'object' ||
      typeof parsed.domainSignature !== 'string' ||
      typeof parsed.repository !== 'string' ||
      typeof parsed.uuid !== 'string' ||
      !(parsed.createdAt instanceof Date) ||
      typeof parsed.active !== 'boolean'
    ) {
      throw new Error('failed to parse auth record');
    }
    return new AuthRecord(
      parsed.domainSignature,
      parsed.repository,
      parsed.uuid,
      parsed.createdAt,
      parsed.active,
      typeof parsed.pocket === 'object' ? parsed.pocket : {}
    );
  }
}

class RecordRef {
  constructor(repository, uuid) {
    if (typeof repository !== 'string' || typeof uuid !== 'string') {
      throw new Error('bad record ref');
    }
    this.repository = repository;
    this.uuid = uuid;
  }

  isEmpty() {
    return false;
  }

  deserialize(value) {
    if (value instanceof RecordRef) {
      return value;
    }

    return RecordRef.deserialize(value);
  }

  serialize() {
    return JSON.stringify({ repository: this.repository, uuid: this.uuid });
  }

  static deserialize(value) {
    if (value instanceof RecordRef) {
      return value;
    }

    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    if (typeof parsed !== 'object' || typeof parsed.repository !== 'string' || typeof parsed.uuid !== 'string') {
      throw new Error('failed to parse record ref');
    }
    return new RecordRef(parsed.repository, parsed.uuid);
  }

  static fromRecordEntry(recordEntry) {
    return new RecordRef(recordEntry.__repository__, recordEntry.uuid);
  }
}

class Record {
  constructor(data) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
    this.uuid = data.uuid;
  }

  static make(data) {
    if (typeof data !== 'object' || typeof data.uuid !== 'string' || !data.uuid) {
      throw new Error('Bad record data');
    }
    return new Record(data);
  }
}

class RecordEntry extends Record {
  constructor(repository, uuid, data) {
    super({ uuid, ...data });
    this.__repository__ = repository;
  }
}

class Artifacts {
  constructor(artifacts = {}) {
    this.child = artifacts.child || null;
    this.parent = artifacts.parent || null;
    this.subject = artifacts.subject || null;
    this.inviter = artifacts.inviter || null;
    this.invitee = artifacts.invitee || null;
    this.agent = artifacts.agent || null;
    this.target = artifacts.target || null;
    this.children = artifacts.children || null;
    this.parents = artifacts.parents || null;
    this.subjects = artifacts.subjects || null;
    this.inviters = artifacts.inviters || null;
    this.invitees = artifacts.invitees || null;
    this.agents = artifacts.agents || null;
    this.targets = artifacts.targets || null;
  }
}

module.exports = { Artifact, AuthRecord, Record, RecordRef, RecordEntry, Artifacts };
