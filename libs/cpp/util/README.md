# `@voltiso/cpp.util`

# Nomenclature

Containers: `insert` or `erase` item - implies elements are constructed/destructed.
* `add` can be troublesome - say the container is a dynamic tensor.

Containers, where there's one special place to insert/erase from: `push` and `pop`.

General: `add` or `remove` things logically (not necesarily meaning calling constructors/destructors).
