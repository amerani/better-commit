const { parse } = require("../branch");

test("should be null for detached head", () => {
    const HEAD = "abb907216866d0bf6c16d588d5e1494cb3ed65f6";
    expect(parse(HEAD)).toBeNull();
});

test("should be master for master", () => {
    const HEAD = "ref: refs/heads/master";
    const output = parse(HEAD);
    expect(output).toBe("master");
});

test("should be branch-name for branch-name", () => {
    const HEAD = "ref: refs/heads/branch-name";
    const output = parse(HEAD);
    expect(output).toBe("branch-name");
});

test("should be tix/123 for tix/123", () => {
    const HEAD = "ref: refs/heads/tix/123";
    const output = parse(HEAD);
    expect(output).toBe("tix/123");
});