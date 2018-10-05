const filterPlugins = require("../src/filterPlugins");

test('should exclude a core plugin', () => {
    const core = ["prepend", ["autocorrect", {test: true}]];
    const rc = ["!prepend"];
    const plugins = filterPlugins([...rc, ...core]);
    expect(plugins).toEqual([["autocorrect",{test: true}]]);
});

test('should not exclude', () => {
    const all = ["test1", "test2"];
    const plugins = filterPlugins(all);
    expect(plugins).toEqual([
        ["test1", {}],
        ["test2", {}]
    ]);
})