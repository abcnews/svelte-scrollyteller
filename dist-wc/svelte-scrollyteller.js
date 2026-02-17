var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _a, _commit_callbacks, _discard_callbacks, _pending, _blocking_pending, _deferred, _dirty_effects, _maybe_dirty_effects, _Batch_instances, traverse_effect_tree_fn, defer_effects_fn, clear_marked_fn, resolve_fn, commit_fn, _pending2, _anchor, _hydrate_open, _props, _children, _effect, _main_effect, _pending_effect, _failed_effect, _offscreen_fragment, _pending_anchor, _local_pending_count, _pending_count, _is_creating_fallback, _effect_pending, _effect_pending_subscriber, _Boundary_instances, hydrate_resolved_content_fn, hydrate_pending_content_fn, get_anchor_fn, run_fn, show_pending_snippet_fn, update_pending_count_fn, _batches, _onscreen, _offscreen, _outroing, _transition, _commit, _discard, _events, _instance;
const PUBLIC_VERSION = "5";
if (typeof window !== "undefined") {
  ((_a = window.__svelte ?? (window.__svelte = {})).v ?? (_a.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
}
const EACH_ITEM_REACTIVE = 1;
const EACH_INDEX_REACTIVE = 1 << 1;
const EACH_IS_CONTROLLED = 1 << 2;
const EACH_IS_ANIMATED = 1 << 3;
const EACH_ITEM_IMMUTABLE = 1 << 4;
const PROPS_IS_IMMUTABLE = 1;
const PROPS_IS_UPDATED = 1 << 2;
const PROPS_IS_BINDABLE = 1 << 3;
const PROPS_IS_LAZY_INITIAL = 1 << 4;
const TEMPLATE_FRAGMENT = 1;
const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
const HYDRATION_START = "[";
const HYDRATION_START_ELSE = "[!";
const HYDRATION_END = "]";
const HYDRATION_ERROR = {};
const UNINITIALIZED = Symbol();
const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
const DEV = false;
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var array_from = Array.from;
var object_keys = Object.keys;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
function is_function(thing) {
  return typeof thing === "function";
}
const noop = () => {
};
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
function deferred() {
  var resolve;
  var reject;
  var promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const RENDER_EFFECT = 1 << 3;
const BLOCK_EFFECT = 1 << 4;
const BRANCH_EFFECT = 1 << 5;
const ROOT_EFFECT = 1 << 6;
const BOUNDARY_EFFECT = 1 << 7;
const CONNECTED = 1 << 9;
const CLEAN = 1 << 10;
const DIRTY = 1 << 11;
const MAYBE_DIRTY = 1 << 12;
const INERT = 1 << 13;
const DESTROYED = 1 << 14;
const EFFECT_RAN = 1 << 15;
const EFFECT_TRANSPARENT = 1 << 16;
const EAGER_EFFECT = 1 << 17;
const HEAD_EFFECT = 1 << 18;
const EFFECT_PRESERVED = 1 << 19;
const USER_EFFECT = 1 << 20;
const WAS_MARKED = 1 << 15;
const REACTION_IS_UPDATING = 1 << 21;
const ASYNC = 1 << 22;
const ERROR_VALUE = 1 << 23;
const STATE_SYMBOL = Symbol("$state");
const LEGACY_PROPS = Symbol("legacy props");
const LOADING_ATTR_SYMBOL = Symbol("");
const STALE_REACTION = new class StaleReactionError extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "StaleReactionError");
    __publicField(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
function lifecycle_outside_component(name) {
  {
    throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
  }
}
function async_derived_orphan() {
  {
    throw new Error(`https://svelte.dev/e/async_derived_orphan`);
  }
}
function effect_in_teardown(rune) {
  {
    throw new Error(`https://svelte.dev/e/effect_in_teardown`);
  }
}
function effect_in_unowned_derived() {
  {
    throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
  }
}
function effect_orphan(rune) {
  {
    throw new Error(`https://svelte.dev/e/effect_orphan`);
  }
}
function effect_update_depth_exceeded() {
  {
    throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
  }
}
function hydration_failed() {
  {
    throw new Error(`https://svelte.dev/e/hydration_failed`);
  }
}
function props_invalid_value(key) {
  {
    throw new Error(`https://svelte.dev/e/props_invalid_value`);
  }
}
function state_descriptors_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
  }
}
function state_prototype_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
  }
}
function state_unsafe_mutation() {
  {
    throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
  }
}
function svelte_boundary_reset_onerror() {
  {
    throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
  }
}
function hydration_mismatch(location2) {
  {
    console.warn(`https://svelte.dev/e/hydration_mismatch`);
  }
}
function svelte_boundary_reset_noop() {
  {
    console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
  }
}
let hydrating = false;
function set_hydrating(value) {
  hydrating = value;
}
let hydrate_node;
function set_hydrate_node(node) {
  if (node === null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return hydrate_node = node;
}
function hydrate_next() {
  return set_hydrate_node(
    /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(hydrate_node)
  );
}
function reset(node) {
  if (!hydrating) return;
  if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  hydrate_node = node;
}
function next(count = 1) {
  if (hydrating) {
    var i = count;
    var node = hydrate_node;
    while (i--) {
      node = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node);
    }
    hydrate_node = node;
  }
}
function skip_nodes(remove = true) {
  var depth = 0;
  var node = hydrate_node;
  while (true) {
    if (node.nodeType === COMMENT_NODE) {
      var data = (
        /** @type {Comment} */
        node.data
      );
      if (data === HYDRATION_END) {
        if (depth === 0) return node;
        depth -= 1;
      } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE) {
        depth += 1;
      }
    }
    var next2 = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node)
    );
    if (remove) node.remove();
    node = next2;
  }
}
function read_hydration_instruction(node) {
  if (!node || node.nodeType !== COMMENT_NODE) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return (
    /** @type {Comment} */
    node.data
  );
}
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}
let tracing_mode_flag = false;
const empty = [];
function snapshot(value, skip_warning = false, no_tojson = false) {
  return clone(value, /* @__PURE__ */ new Map(), "", empty, null, no_tojson);
}
function clone(value, cloned, path, paths, original = null, no_tojson = false) {
  if (typeof value === "object" && value !== null) {
    var unwrapped = cloned.get(value);
    if (unwrapped !== void 0) return unwrapped;
    if (value instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(value)
    );
    if (value instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(value)
    );
    if (is_array(value)) {
      var copy = (
        /** @type {Snapshot<any>} */
        Array(value.length)
      );
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var i = 0; i < value.length; i += 1) {
        var element = value[i];
        if (i in value) {
          copy[i] = clone(element, cloned, path, paths, null, no_tojson);
        }
      }
      return copy;
    }
    if (get_prototype_of(value) === object_prototype) {
      copy = {};
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var key in value) {
        copy[key] = clone(
          // @ts-expect-error
          value[key],
          cloned,
          path,
          paths,
          null,
          no_tojson
        );
      }
      return copy;
    }
    if (value instanceof Date) {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    }
    if (typeof /** @type {T & { toJSON?: any } } */
    value.toJSON === "function" && !no_tojson) {
      return clone(
        /** @type {T & { toJSON(): any } } */
        value.toJSON(),
        cloned,
        path,
        paths,
        // Associate the instance with the toJSON clone
        value
      );
    }
  }
  if (value instanceof EventTarget) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(value)
    );
  } catch (e) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
}
let component_context = null;
function set_component_context(context) {
  component_context = context;
}
function getContext(key) {
  const context_map = get_or_init_context_map();
  const result = (
    /** @type {T} */
    context_map.get(key)
  );
  return result;
}
function setContext(key, context) {
  const context_map = get_or_init_context_map();
  context_map.set(key, context);
  return context;
}
function push(props, runes = false, fn) {
  component_context = {
    p: component_context,
    i: false,
    c: null,
    e: null,
    s: props,
    x: null,
    l: null
  };
}
function pop(component2) {
  var context = (
    /** @type {ComponentContext} */
    component_context
  );
  var effects = context.e;
  if (effects !== null) {
    context.e = null;
    for (var fn of effects) {
      create_user_effect(fn);
    }
  }
  if (component2 !== void 0) {
    context.x = component2;
  }
  context.i = true;
  component_context = context.p;
  return component2 ?? /** @type {T} */
  {};
}
function is_runes() {
  return true;
}
function get_or_init_context_map(name) {
  if (component_context === null) {
    lifecycle_outside_component();
  }
  return component_context.c ?? (component_context.c = new Map(get_parent_context(component_context) || void 0));
}
function get_parent_context(component_context2) {
  let parent = component_context2.p;
  while (parent !== null) {
    const context_map = parent.c;
    if (context_map !== null) {
      return context_map;
    }
    parent = parent.p;
  }
  return null;
}
let micro_tasks = [];
function run_micro_tasks() {
  var tasks = micro_tasks;
  micro_tasks = [];
  run_all(tasks);
}
function queue_micro_task(fn) {
  if (micro_tasks.length === 0 && !is_flushing_sync) {
    var tasks = micro_tasks;
    queueMicrotask(() => {
      if (tasks === micro_tasks) run_micro_tasks();
    });
  }
  micro_tasks.push(fn);
}
function flush_tasks() {
  while (micro_tasks.length > 0) {
    run_micro_tasks();
  }
}
function handle_error(error) {
  var effect2 = active_effect;
  if (effect2 === null) {
    active_reaction.f |= ERROR_VALUE;
    return error;
  }
  if ((effect2.f & EFFECT_RAN) === 0) {
    if ((effect2.f & BOUNDARY_EFFECT) === 0) {
      throw error;
    }
    effect2.b.error(error);
  } else {
    invoke_error_boundary(error, effect2);
  }
}
function invoke_error_boundary(error, effect2) {
  while (effect2 !== null) {
    if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
      try {
        effect2.b.error(error);
        return;
      } catch (e) {
        error = e;
      }
    }
    effect2 = effect2.parent;
  }
  throw error;
}
const batches = /* @__PURE__ */ new Set();
let current_batch = null;
let batch_values = null;
let queued_root_effects = [];
let last_scheduled_effect = null;
let is_flushing = false;
let is_flushing_sync = false;
const _Batch = class _Batch {
  constructor() {
    __privateAdd(this, _Batch_instances);
    __publicField(this, "committed", false);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    __publicField(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    __publicField(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    __privateAdd(this, _commit_callbacks, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    __privateAdd(this, _discard_callbacks, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    __privateAdd(this, _pending, 0);
    /**
     * The number of async effects that are currently in flight, _not_ inside a pending boundary
     */
    __privateAdd(this, _blocking_pending, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    __privateAdd(this, _deferred, null);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    __privateAdd(this, _dirty_effects, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    __privateAdd(this, _maybe_dirty_effects, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    __publicField(this, "skipped_effects", /* @__PURE__ */ new Set());
    __publicField(this, "is_fork", false);
  }
  is_deferred() {
    return this.is_fork || __privateGet(this, _blocking_pending) > 0;
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(root_effects) {
    var _a2;
    queued_root_effects = [];
    this.apply();
    var target = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: [],
      block_effects: []
    };
    for (const root2 of root_effects) {
      __privateMethod(this, _Batch_instances, traverse_effect_tree_fn).call(this, root2, target);
    }
    if (!this.is_fork) {
      __privateMethod(this, _Batch_instances, resolve_fn).call(this);
    }
    if (this.is_deferred()) {
      __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, target.effects);
      __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, target.render_effects);
      __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, target.block_effects);
    } else {
      current_batch = null;
      flush_queued_effects(target.render_effects);
      flush_queued_effects(target.effects);
      (_a2 = __privateGet(this, _deferred)) == null ? void 0 : _a2.resolve();
    }
    batch_values = null;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(source2, value) {
    if (!this.previous.has(source2)) {
      this.previous.set(source2, value);
    }
    if ((source2.f & ERROR_VALUE) === 0) {
      this.current.set(source2, source2.v);
      batch_values == null ? void 0 : batch_values.set(source2, source2.v);
    }
  }
  activate() {
    current_batch = this;
    this.apply();
  }
  deactivate() {
    if (current_batch !== this) return;
    current_batch = null;
    batch_values = null;
  }
  flush() {
    this.activate();
    if (queued_root_effects.length > 0) {
      flush_effects();
      if (current_batch !== null && current_batch !== this) {
        return;
      }
    } else if (__privateGet(this, _pending) === 0) {
      this.process([]);
    }
    this.deactivate();
  }
  discard() {
    for (const fn of __privateGet(this, _discard_callbacks)) fn(this);
    __privateGet(this, _discard_callbacks).clear();
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(blocking) {
    __privateSet(this, _pending, __privateGet(this, _pending) + 1);
    if (blocking) __privateSet(this, _blocking_pending, __privateGet(this, _blocking_pending) + 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(blocking) {
    __privateSet(this, _pending, __privateGet(this, _pending) - 1);
    if (blocking) __privateSet(this, _blocking_pending, __privateGet(this, _blocking_pending) - 1);
    this.revive();
  }
  revive() {
    for (const e of __privateGet(this, _dirty_effects)) {
      set_signal_status(e, DIRTY);
      schedule_effect(e);
    }
    for (const e of __privateGet(this, _maybe_dirty_effects)) {
      set_signal_status(e, MAYBE_DIRTY);
      schedule_effect(e);
    }
    __privateSet(this, _dirty_effects, []);
    __privateSet(this, _maybe_dirty_effects, []);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(fn) {
    __privateGet(this, _commit_callbacks).add(fn);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(fn) {
    __privateGet(this, _discard_callbacks).add(fn);
  }
  settled() {
    return (__privateGet(this, _deferred) ?? __privateSet(this, _deferred, deferred())).promise;
  }
  static ensure() {
    if (current_batch === null) {
      const batch = current_batch = new _Batch();
      batches.add(current_batch);
      if (!is_flushing_sync) {
        _Batch.enqueue(() => {
          if (current_batch !== batch) {
            return;
          }
          batch.flush();
        });
      }
    }
    return current_batch;
  }
  /** @param {() => void} task */
  static enqueue(task) {
    queue_micro_task(task);
  }
  apply() {
    return;
  }
};
_commit_callbacks = new WeakMap();
_discard_callbacks = new WeakMap();
_pending = new WeakMap();
_blocking_pending = new WeakMap();
_deferred = new WeakMap();
_dirty_effects = new WeakMap();
_maybe_dirty_effects = new WeakMap();
_Batch_instances = new WeakSet();
/**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {EffectTarget} target
 */
traverse_effect_tree_fn = function(root2, target) {
  var _a2;
  root2.f ^= CLEAN;
  var effect2 = root2.first;
  while (effect2 !== null) {
    var flags2 = effect2.f;
    var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
    var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
    var skip = is_skippable_branch || (flags2 & INERT) !== 0 || this.skipped_effects.has(effect2);
    if ((effect2.f & BOUNDARY_EFFECT) !== 0 && ((_a2 = effect2.b) == null ? void 0 : _a2.is_pending())) {
      target = {
        parent: target,
        effect: effect2,
        effects: [],
        render_effects: [],
        block_effects: []
      };
    }
    if (!skip && effect2.fn !== null) {
      if (is_branch) {
        effect2.f ^= CLEAN;
      } else if ((flags2 & EFFECT) !== 0) {
        target.effects.push(effect2);
      } else if (is_dirty(effect2)) {
        if ((effect2.f & BLOCK_EFFECT) !== 0) target.block_effects.push(effect2);
        update_effect(effect2);
      }
      var child2 = effect2.first;
      if (child2 !== null) {
        effect2 = child2;
        continue;
      }
    }
    var parent = effect2.parent;
    effect2 = effect2.next;
    while (effect2 === null && parent !== null) {
      if (parent === target.effect) {
        __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, target.effects);
        __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, target.render_effects);
        __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, target.block_effects);
        target = /** @type {EffectTarget} */
        target.parent;
      }
      effect2 = parent.next;
      parent = parent.parent;
    }
  }
};
/**
 * @param {Effect[]} effects
 */
defer_effects_fn = function(effects) {
  for (const e of effects) {
    const target = (e.f & DIRTY) !== 0 ? __privateGet(this, _dirty_effects) : __privateGet(this, _maybe_dirty_effects);
    target.push(e);
    __privateMethod(this, _Batch_instances, clear_marked_fn).call(this, e.deps);
    set_signal_status(e, CLEAN);
  }
};
/**
 * @param {Value[] | null} deps
 */
clear_marked_fn = function(deps) {
  if (deps === null) return;
  for (const dep of deps) {
    if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
      continue;
    }
    dep.f ^= WAS_MARKED;
    __privateMethod(this, _Batch_instances, clear_marked_fn).call(
      this,
      /** @type {Derived} */
      dep.deps
    );
  }
};
resolve_fn = function() {
  if (__privateGet(this, _blocking_pending) === 0) {
    for (const fn of __privateGet(this, _commit_callbacks)) fn();
    __privateGet(this, _commit_callbacks).clear();
  }
  if (__privateGet(this, _pending) === 0) {
    __privateMethod(this, _Batch_instances, commit_fn).call(this);
  }
};
commit_fn = function() {
  var _a2;
  if (batches.size > 1) {
    this.previous.clear();
    var previous_batch_values = batch_values;
    var is_earlier = true;
    var dummy_target = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: [],
      block_effects: []
    };
    for (const batch of batches) {
      if (batch === this) {
        is_earlier = false;
        continue;
      }
      const sources = [];
      for (const [source2, value] of this.current) {
        if (batch.current.has(source2)) {
          if (is_earlier && value !== batch.current.get(source2)) {
            batch.current.set(source2, value);
          } else {
            continue;
          }
        }
        sources.push(source2);
      }
      if (sources.length === 0) {
        continue;
      }
      const others = [...batch.current.keys()].filter((s) => !this.current.has(s));
      if (others.length > 0) {
        var prev_queued_root_effects = queued_root_effects;
        queued_root_effects = [];
        const marked = /* @__PURE__ */ new Set();
        const checked = /* @__PURE__ */ new Map();
        for (const source2 of sources) {
          mark_effects(source2, others, marked, checked);
        }
        if (queued_root_effects.length > 0) {
          current_batch = batch;
          batch.apply();
          for (const root2 of queued_root_effects) {
            __privateMethod(_a2 = batch, _Batch_instances, traverse_effect_tree_fn).call(_a2, root2, dummy_target);
          }
          batch.deactivate();
        }
        queued_root_effects = prev_queued_root_effects;
      }
    }
    current_batch = null;
    batch_values = previous_batch_values;
  }
  this.committed = true;
  batches.delete(this);
};
let Batch = _Batch;
function flushSync(fn) {
  var was_flushing_sync = is_flushing_sync;
  is_flushing_sync = true;
  try {
    var result;
    if (fn) ;
    while (true) {
      flush_tasks();
      if (queued_root_effects.length === 0) {
        current_batch == null ? void 0 : current_batch.flush();
        if (queued_root_effects.length === 0) {
          last_scheduled_effect = null;
          return (
            /** @type {T} */
            result
          );
        }
      }
      flush_effects();
    }
  } finally {
    is_flushing_sync = was_flushing_sync;
  }
}
function flush_effects() {
  var was_updating_effect = is_updating_effect;
  is_flushing = true;
  var source_stacks = null;
  try {
    var flush_count = 0;
    set_is_updating_effect(true);
    while (queued_root_effects.length > 0) {
      var batch = Batch.ensure();
      if (flush_count++ > 1e3) {
        var updates, entry;
        if (DEV) ;
        infinite_loop_guard();
      }
      batch.process(queued_root_effects);
      old_values.clear();
      if (DEV) ;
    }
  } finally {
    is_flushing = false;
    set_is_updating_effect(was_updating_effect);
    last_scheduled_effect = null;
  }
}
function infinite_loop_guard() {
  try {
    effect_update_depth_exceeded();
  } catch (error) {
    invoke_error_boundary(error, last_scheduled_effect);
  }
}
let eager_block_effects = null;
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0) return;
  var i = 0;
  while (i < length) {
    var effect2 = effects[i++];
    if ((effect2.f & (DESTROYED | INERT)) === 0 && is_dirty(effect2)) {
      eager_block_effects = /* @__PURE__ */ new Set();
      update_effect(effect2);
      if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
        if (effect2.teardown === null && effect2.ac === null) {
          unlink_effect(effect2);
        } else {
          effect2.fn = null;
        }
      }
      if ((eager_block_effects == null ? void 0 : eager_block_effects.size) > 0) {
        old_values.clear();
        for (const e of eager_block_effects) {
          if ((e.f & (DESTROYED | INERT)) !== 0) continue;
          const ordered_effects = [e];
          let ancestor = e.parent;
          while (ancestor !== null) {
            if (eager_block_effects.has(ancestor)) {
              eager_block_effects.delete(ancestor);
              ordered_effects.push(ancestor);
            }
            ancestor = ancestor.parent;
          }
          for (let j = ordered_effects.length - 1; j >= 0; j--) {
            const e2 = ordered_effects[j];
            if ((e2.f & (DESTROYED | INERT)) !== 0) continue;
            update_effect(e2);
          }
        }
        eager_block_effects.clear();
      }
    }
  }
  eager_block_effects = null;
}
function mark_effects(value, sources, marked, checked) {
  if (marked.has(value)) return;
  marked.add(value);
  if (value.reactions !== null) {
    for (const reaction of value.reactions) {
      const flags2 = reaction.f;
      if ((flags2 & DERIVED) !== 0) {
        mark_effects(
          /** @type {Derived} */
          reaction,
          sources,
          marked,
          checked
        );
      } else if ((flags2 & (ASYNC | BLOCK_EFFECT)) !== 0 && (flags2 & DIRTY) === 0 && // we may have scheduled this one already
      depends_on(reaction, sources, checked)) {
        set_signal_status(reaction, DIRTY);
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}
function depends_on(reaction, sources, checked) {
  const depends = checked.get(reaction);
  if (depends !== void 0) return depends;
  if (reaction.deps !== null) {
    for (const dep of reaction.deps) {
      if (sources.includes(dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on(
        /** @type {Derived} */
        dep,
        sources,
        checked
      )) {
        checked.set(
          /** @type {Derived} */
          dep,
          true
        );
        return true;
      }
    }
  }
  checked.set(reaction, false);
  return false;
}
function schedule_effect(signal) {
  var effect2 = last_scheduled_effect = signal;
  while (effect2.parent !== null) {
    effect2 = effect2.parent;
    var flags2 = effect2.f;
    if (is_flushing && effect2 === active_effect && (flags2 & BLOCK_EFFECT) !== 0 && (flags2 & HEAD_EFFECT) === 0) {
      return;
    }
    if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
      if ((flags2 & CLEAN) === 0) return;
      effect2.f ^= CLEAN;
    }
  }
  queued_root_effects.push(effect2);
}
function createSubscriber(start) {
  let subscribers = 0;
  let version = source(0);
  let stop;
  return () => {
    if (effect_tracking()) {
      get$1(version);
      render_effect(() => {
        if (subscribers === 0) {
          stop = untrack(() => start(() => increment(version)));
        }
        subscribers += 1;
        return () => {
          queue_micro_task(() => {
            subscribers -= 1;
            if (subscribers === 0) {
              stop == null ? void 0 : stop();
              stop = void 0;
              increment(version);
            }
          });
        };
      });
    }
  };
}
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED | BOUNDARY_EFFECT;
function boundary(node, props, children2) {
  new Boundary(node, props, children2);
}
class Boundary {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(node, props, children2) {
    __privateAdd(this, _Boundary_instances);
    /** @type {Boundary | null} */
    __publicField(this, "parent");
    __privateAdd(this, _pending2, false);
    /** @type {TemplateNode} */
    __privateAdd(this, _anchor);
    /** @type {TemplateNode | null} */
    __privateAdd(this, _hydrate_open, hydrating ? hydrate_node : null);
    /** @type {BoundaryProps} */
    __privateAdd(this, _props);
    /** @type {((anchor: Node) => void)} */
    __privateAdd(this, _children);
    /** @type {Effect} */
    __privateAdd(this, _effect);
    /** @type {Effect | null} */
    __privateAdd(this, _main_effect, null);
    /** @type {Effect | null} */
    __privateAdd(this, _pending_effect, null);
    /** @type {Effect | null} */
    __privateAdd(this, _failed_effect, null);
    /** @type {DocumentFragment | null} */
    __privateAdd(this, _offscreen_fragment, null);
    /** @type {TemplateNode | null} */
    __privateAdd(this, _pending_anchor, null);
    __privateAdd(this, _local_pending_count, 0);
    __privateAdd(this, _pending_count, 0);
    __privateAdd(this, _is_creating_fallback, false);
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    __privateAdd(this, _effect_pending, null);
    __privateAdd(this, _effect_pending_subscriber, createSubscriber(() => {
      __privateSet(this, _effect_pending, source(__privateGet(this, _local_pending_count)));
      return () => {
        __privateSet(this, _effect_pending, null);
      };
    }));
    __privateSet(this, _anchor, node);
    __privateSet(this, _props, props);
    __privateSet(this, _children, children2);
    this.parent = /** @type {Effect} */
    active_effect.b;
    __privateSet(this, _pending2, !!__privateGet(this, _props).pending);
    __privateSet(this, _effect, block(() => {
      active_effect.b = this;
      if (hydrating) {
        const comment2 = __privateGet(this, _hydrate_open);
        hydrate_next();
        const server_rendered_pending = (
          /** @type {Comment} */
          comment2.nodeType === COMMENT_NODE && /** @type {Comment} */
          comment2.data === HYDRATION_START_ELSE
        );
        if (server_rendered_pending) {
          __privateMethod(this, _Boundary_instances, hydrate_pending_content_fn).call(this);
        } else {
          __privateMethod(this, _Boundary_instances, hydrate_resolved_content_fn).call(this);
        }
      } else {
        var anchor = __privateMethod(this, _Boundary_instances, get_anchor_fn).call(this);
        try {
          __privateSet(this, _main_effect, branch(() => children2(anchor)));
        } catch (error) {
          this.error(error);
        }
        if (__privateGet(this, _pending_count) > 0) {
          __privateMethod(this, _Boundary_instances, show_pending_snippet_fn).call(this);
        } else {
          __privateSet(this, _pending2, false);
        }
      }
      return () => {
        var _a2;
        (_a2 = __privateGet(this, _pending_anchor)) == null ? void 0 : _a2.remove();
      };
    }, flags));
    if (hydrating) {
      __privateSet(this, _anchor, hydrate_node);
    }
  }
  /**
   * Returns `true` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_pending() {
    return __privateGet(this, _pending2) || !!this.parent && this.parent.is_pending();
  }
  has_pending_snippet() {
    return !!__privateGet(this, _props).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(d) {
    __privateMethod(this, _Boundary_instances, update_pending_count_fn).call(this, d);
    __privateSet(this, _local_pending_count, __privateGet(this, _local_pending_count) + d);
    if (__privateGet(this, _effect_pending)) {
      internal_set(__privateGet(this, _effect_pending), __privateGet(this, _local_pending_count));
    }
  }
  get_effect_pending() {
    __privateGet(this, _effect_pending_subscriber).call(this);
    return get$1(
      /** @type {Source<number>} */
      __privateGet(this, _effect_pending)
    );
  }
  /** @param {unknown} error */
  error(error) {
    var onerror = __privateGet(this, _props).onerror;
    let failed = __privateGet(this, _props).failed;
    if (__privateGet(this, _is_creating_fallback) || !onerror && !failed) {
      throw error;
    }
    if (__privateGet(this, _main_effect)) {
      destroy_effect(__privateGet(this, _main_effect));
      __privateSet(this, _main_effect, null);
    }
    if (__privateGet(this, _pending_effect)) {
      destroy_effect(__privateGet(this, _pending_effect));
      __privateSet(this, _pending_effect, null);
    }
    if (__privateGet(this, _failed_effect)) {
      destroy_effect(__privateGet(this, _failed_effect));
      __privateSet(this, _failed_effect, null);
    }
    if (hydrating) {
      set_hydrate_node(
        /** @type {TemplateNode} */
        __privateGet(this, _hydrate_open)
      );
      next();
      set_hydrate_node(skip_nodes());
    }
    var did_reset = false;
    var calling_on_error = false;
    const reset2 = () => {
      if (did_reset) {
        svelte_boundary_reset_noop();
        return;
      }
      did_reset = true;
      if (calling_on_error) {
        svelte_boundary_reset_onerror();
      }
      Batch.ensure();
      __privateSet(this, _local_pending_count, 0);
      if (__privateGet(this, _failed_effect) !== null) {
        pause_effect(__privateGet(this, _failed_effect), () => {
          __privateSet(this, _failed_effect, null);
        });
      }
      __privateSet(this, _pending2, this.has_pending_snippet());
      __privateSet(this, _main_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
        __privateSet(this, _is_creating_fallback, false);
        return branch(() => __privateGet(this, _children).call(this, __privateGet(this, _anchor)));
      }));
      if (__privateGet(this, _pending_count) > 0) {
        __privateMethod(this, _Boundary_instances, show_pending_snippet_fn).call(this);
      } else {
        __privateSet(this, _pending2, false);
      }
    };
    var previous_reaction = active_reaction;
    try {
      set_active_reaction(null);
      calling_on_error = true;
      onerror == null ? void 0 : onerror(error, reset2);
      calling_on_error = false;
    } catch (error2) {
      invoke_error_boundary(error2, __privateGet(this, _effect) && __privateGet(this, _effect).parent);
    } finally {
      set_active_reaction(previous_reaction);
    }
    if (failed) {
      queue_micro_task(() => {
        __privateSet(this, _failed_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
          Batch.ensure();
          __privateSet(this, _is_creating_fallback, true);
          try {
            return branch(() => {
              failed(
                __privateGet(this, _anchor),
                () => error,
                () => reset2
              );
            });
          } catch (error2) {
            invoke_error_boundary(
              error2,
              /** @type {Effect} */
              __privateGet(this, _effect).parent
            );
            return null;
          } finally {
            __privateSet(this, _is_creating_fallback, false);
          }
        }));
      });
    }
  }
}
_pending2 = new WeakMap();
_anchor = new WeakMap();
_hydrate_open = new WeakMap();
_props = new WeakMap();
_children = new WeakMap();
_effect = new WeakMap();
_main_effect = new WeakMap();
_pending_effect = new WeakMap();
_failed_effect = new WeakMap();
_offscreen_fragment = new WeakMap();
_pending_anchor = new WeakMap();
_local_pending_count = new WeakMap();
_pending_count = new WeakMap();
_is_creating_fallback = new WeakMap();
_effect_pending = new WeakMap();
_effect_pending_subscriber = new WeakMap();
_Boundary_instances = new WeakSet();
hydrate_resolved_content_fn = function() {
  try {
    __privateSet(this, _main_effect, branch(() => __privateGet(this, _children).call(this, __privateGet(this, _anchor))));
  } catch (error) {
    this.error(error);
  }
  __privateSet(this, _pending2, false);
};
hydrate_pending_content_fn = function() {
  const pending = __privateGet(this, _props).pending;
  if (!pending) {
    return;
  }
  __privateSet(this, _pending_effect, branch(() => pending(__privateGet(this, _anchor))));
  Batch.enqueue(() => {
    var anchor = __privateMethod(this, _Boundary_instances, get_anchor_fn).call(this);
    __privateSet(this, _main_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
      Batch.ensure();
      return branch(() => __privateGet(this, _children).call(this, anchor));
    }));
    if (__privateGet(this, _pending_count) > 0) {
      __privateMethod(this, _Boundary_instances, show_pending_snippet_fn).call(this);
    } else {
      pause_effect(
        /** @type {Effect} */
        __privateGet(this, _pending_effect),
        () => {
          __privateSet(this, _pending_effect, null);
        }
      );
      __privateSet(this, _pending2, false);
    }
  });
};
get_anchor_fn = function() {
  var anchor = __privateGet(this, _anchor);
  if (__privateGet(this, _pending2)) {
    __privateSet(this, _pending_anchor, create_text());
    __privateGet(this, _anchor).before(__privateGet(this, _pending_anchor));
    anchor = __privateGet(this, _pending_anchor);
  }
  return anchor;
};
/**
 * @param {() => Effect | null} fn
 */
run_fn = function(fn) {
  var previous_effect = active_effect;
  var previous_reaction = active_reaction;
  var previous_ctx = component_context;
  set_active_effect(__privateGet(this, _effect));
  set_active_reaction(__privateGet(this, _effect));
  set_component_context(__privateGet(this, _effect).ctx);
  try {
    return fn();
  } catch (e) {
    handle_error(e);
    return null;
  } finally {
    set_active_effect(previous_effect);
    set_active_reaction(previous_reaction);
    set_component_context(previous_ctx);
  }
};
show_pending_snippet_fn = function() {
  const pending = (
    /** @type {(anchor: Node) => void} */
    __privateGet(this, _props).pending
  );
  if (__privateGet(this, _main_effect) !== null) {
    __privateSet(this, _offscreen_fragment, document.createDocumentFragment());
    __privateGet(this, _offscreen_fragment).append(
      /** @type {TemplateNode} */
      __privateGet(this, _pending_anchor)
    );
    move_effect(__privateGet(this, _main_effect), __privateGet(this, _offscreen_fragment));
  }
  if (__privateGet(this, _pending_effect) === null) {
    __privateSet(this, _pending_effect, branch(() => pending(__privateGet(this, _anchor))));
  }
};
/**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 */
update_pending_count_fn = function(d) {
  var _a2;
  if (!this.has_pending_snippet()) {
    if (this.parent) {
      __privateMethod(_a2 = this.parent, _Boundary_instances, update_pending_count_fn).call(_a2, d);
    }
    return;
  }
  __privateSet(this, _pending_count, __privateGet(this, _pending_count) + d);
  if (__privateGet(this, _pending_count) === 0) {
    __privateSet(this, _pending2, false);
    if (__privateGet(this, _pending_effect)) {
      pause_effect(__privateGet(this, _pending_effect), () => {
        __privateSet(this, _pending_effect, null);
      });
    }
    if (__privateGet(this, _offscreen_fragment)) {
      __privateGet(this, _anchor).before(__privateGet(this, _offscreen_fragment));
      __privateSet(this, _offscreen_fragment, null);
    }
  }
};
function index(_, i) {
  return i;
}
function pause_effects(state2, to_destroy, controlled_anchor) {
  var transitions = [];
  var length = to_destroy.length;
  for (var i = 0; i < length; i++) {
    pause_children(to_destroy[i].e, transitions, true);
  }
  run_out_transitions(transitions, () => {
    var fast_path = transitions.length === 0 && controlled_anchor !== null;
    if (fast_path) {
      var anchor = (
        /** @type {Element} */
        controlled_anchor
      );
      var parent_node = (
        /** @type {Element} */
        anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(anchor);
      state2.items.clear();
      link(state2, to_destroy[0].prev, to_destroy[length - 1].next);
    }
    for (var i2 = 0; i2 < length; i2++) {
      var item = to_destroy[i2];
      if (!fast_path) {
        state2.items.delete(item.k);
        link(state2, item.prev, item.next);
      }
      destroy_effect(item.e, !fast_path);
    }
    if (state2.first === to_destroy[0]) {
      state2.first = to_destroy[0].prev;
    }
  });
}
function each(node, flags2, get_collection, get_key, render_fn, fallback_fn = null) {
  var anchor = node;
  var items = /* @__PURE__ */ new Map();
  var first = null;
  var is_controlled = (flags2 & EACH_IS_CONTROLLED) !== 0;
  var is_reactive_value = (flags2 & EACH_ITEM_REACTIVE) !== 0;
  var is_reactive_index = (flags2 & EACH_INDEX_REACTIVE) !== 0;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      node
    );
    anchor = hydrating ? set_hydrate_node(
      /** @type {Comment | Text} */
      /* @__PURE__ */ get_first_child(parent_node)
    ) : parent_node.appendChild(create_text());
  }
  if (hydrating) {
    hydrate_next();
  }
  var fallback = null;
  var each_array = /* @__PURE__ */ derived_safe_equal(() => {
    var collection = get_collection();
    return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
  });
  var array;
  var first_run = true;
  function commit() {
    reconcile(state2, array, anchor, flags2, get_key);
    if (fallback !== null) {
      if (array.length === 0) {
        if (fallback.fragment) {
          anchor.before(fallback.fragment);
          fallback.fragment = null;
        } else {
          resume_effect(fallback.effect);
        }
        effect2.first = fallback.effect;
      } else {
        pause_effect(fallback.effect, () => {
          fallback = null;
        });
      }
    }
  }
  var effect2 = block(() => {
    array = /** @type {V[]} */
    get$1(each_array);
    var length = array.length;
    let mismatch = false;
    if (hydrating) {
      var is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;
      if (is_else !== (length === 0)) {
        anchor = skip_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
    }
    var keys = /* @__PURE__ */ new Set();
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var prev = null;
    var defer = should_defer_append();
    for (var i = 0; i < length; i += 1) {
      if (hydrating && hydrate_node.nodeType === COMMENT_NODE && /** @type {Comment} */
      hydrate_node.data === HYDRATION_END) {
        anchor = /** @type {Comment} */
        hydrate_node;
        mismatch = true;
        set_hydrating(false);
      }
      var value = array[i];
      var key = get_key(value, i);
      var item = first_run ? null : items.get(key);
      if (item) {
        if (is_reactive_value) {
          internal_set(item.v, value);
        }
        if (is_reactive_index) {
          internal_set(
            /** @type {Value<number>} */
            item.i,
            i
          );
        } else {
          item.i = i;
        }
        if (defer) {
          batch.skipped_effects.delete(item.e);
        }
      } else {
        item = create_item(
          first_run ? anchor : null,
          prev,
          value,
          key,
          i,
          render_fn,
          flags2,
          get_collection
        );
        if (first_run) {
          item.o = true;
          if (prev === null) {
            first = item;
          } else {
            prev.next = item;
          }
          prev = item;
        }
        items.set(key, item);
      }
      keys.add(key);
    }
    if (length === 0 && fallback_fn && !fallback) {
      if (first_run) {
        fallback = {
          fragment: null,
          effect: branch(() => fallback_fn(anchor))
        };
      } else {
        var fragment = document.createDocumentFragment();
        var target = create_text();
        fragment.append(target);
        fallback = {
          fragment,
          effect: branch(() => fallback_fn(target))
        };
      }
    }
    if (hydrating && length > 0) {
      set_hydrate_node(skip_nodes());
    }
    if (!first_run) {
      if (defer) {
        for (const [key2, item2] of items) {
          if (!keys.has(key2)) {
            batch.skipped_effects.add(item2.e);
          }
        }
        batch.oncommit(commit);
        batch.ondiscard(() => {
        });
      } else {
        commit();
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
    get$1(each_array);
  });
  var state2 = { effect: effect2, items, first };
  first_run = false;
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function reconcile(state2, array, anchor, flags2, get_key) {
  var _a2, _b, _c, _d;
  var is_animated = (flags2 & EACH_IS_ANIMATED) !== 0;
  var length = array.length;
  var items = state2.items;
  var current = state2.first;
  var seen;
  var prev = null;
  var to_animate;
  var matched = [];
  var stashed = [];
  var value;
  var key;
  var item;
  var i;
  if (is_animated) {
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      item = /** @type {EachItem} */
      items.get(key);
      (_a2 = item.a) == null ? void 0 : _a2.measure();
      (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).add(item);
    }
  }
  for (i = 0; i < length; i += 1) {
    value = array[i];
    key = get_key(value, i);
    item = /** @type {EachItem} */
    items.get(key);
    state2.first ?? (state2.first = item);
    if (!item.o) {
      item.o = true;
      var next2 = prev ? prev.next : current;
      link(state2, prev, item);
      link(state2, item, next2);
      move(item, next2, anchor);
      prev = item;
      matched = [];
      stashed = [];
      current = prev.next;
      continue;
    }
    if ((item.e.f & INERT) !== 0) {
      resume_effect(item.e);
      if (is_animated) {
        (_b = item.a) == null ? void 0 : _b.unfix();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).delete(item);
      }
    }
    if (item !== current) {
      if (seen !== void 0 && seen.has(item)) {
        if (matched.length < stashed.length) {
          var start = stashed[0];
          var j;
          prev = start.prev;
          var a = matched[0];
          var b = matched[matched.length - 1];
          for (j = 0; j < matched.length; j += 1) {
            move(matched[j], start, anchor);
          }
          for (j = 0; j < stashed.length; j += 1) {
            seen.delete(stashed[j]);
          }
          link(state2, a.prev, b.next);
          link(state2, prev, a);
          link(state2, b, start);
          current = start;
          prev = b;
          i -= 1;
          matched = [];
          stashed = [];
        } else {
          seen.delete(item);
          move(item, current, anchor);
          link(state2, item.prev, item.next);
          link(state2, item, prev === null ? state2.first : prev.next);
          link(state2, prev, item);
          prev = item;
        }
        continue;
      }
      matched = [];
      stashed = [];
      while (current !== null && current.k !== key) {
        if ((current.e.f & INERT) === 0) {
          (seen ?? (seen = /* @__PURE__ */ new Set())).add(current);
        }
        stashed.push(current);
        current = current.next;
      }
      if (current === null) {
        continue;
      }
      item = current;
    }
    matched.push(item);
    prev = item;
    current = item.next;
  }
  if (current !== null || seen !== void 0) {
    var to_destroy = seen === void 0 ? [] : array_from(seen);
    while (current !== null) {
      if ((current.e.f & INERT) === 0) {
        to_destroy.push(current);
      }
      current = current.next;
    }
    var destroy_length = to_destroy.length;
    if (destroy_length > 0) {
      var controlled_anchor = (flags2 & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
      if (is_animated) {
        for (i = 0; i < destroy_length; i += 1) {
          (_c = to_destroy[i].a) == null ? void 0 : _c.measure();
        }
        for (i = 0; i < destroy_length; i += 1) {
          (_d = to_destroy[i].a) == null ? void 0 : _d.fix();
        }
      }
      pause_effects(state2, to_destroy, controlled_anchor);
    }
  }
  if (is_animated) {
    queue_micro_task(() => {
      var _a3;
      if (to_animate === void 0) return;
      for (item of to_animate) {
        (_a3 = item.a) == null ? void 0 : _a3.apply();
      }
    });
  }
}
function create_item(anchor, prev, value, key, index2, render_fn, flags2, get_collection) {
  var reactive = (flags2 & EACH_ITEM_REACTIVE) !== 0;
  var mutable = (flags2 & EACH_ITEM_IMMUTABLE) === 0;
  var v = reactive ? mutable ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : value;
  var i = (flags2 & EACH_INDEX_REACTIVE) === 0 ? index2 : source(index2);
  var item = {
    i,
    v,
    k: key,
    a: null,
    // @ts-expect-error
    e: null,
    o: false,
    prev,
    next: null
  };
  try {
    if (anchor === null) {
      var fragment = document.createDocumentFragment();
      fragment.append(anchor = create_text());
    }
    item.e = branch(() => render_fn(
      /** @type {Node} */
      anchor,
      v,
      i,
      get_collection
    ));
    if (prev !== null) {
      prev.next = item;
    }
    return item;
  } finally {
  }
}
function move(item, next2, anchor) {
  var end = item.next ? (
    /** @type {TemplateNode} */
    item.next.e.nodes_start
  ) : anchor;
  var dest = next2 ? (
    /** @type {TemplateNode} */
    next2.e.nodes_start
  ) : anchor;
  var node = (
    /** @type {TemplateNode} */
    item.e.nodes_start
  );
  while (node !== null && node !== end) {
    var next_node = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node)
    );
    dest.before(node);
    node = next_node;
  }
}
function link(state2, prev, next2) {
  if (prev === null) {
    state2.first = next2;
    state2.effect.first = next2 && next2.e;
  } else {
    if (prev.e.next) {
      prev.e.next.prev = null;
    }
    prev.next = next2;
    prev.e.next = next2 && next2.e;
  }
  if (next2 === null) {
    state2.effect.last = prev && prev.e;
  } else {
    if (next2.e.prev) {
      next2.e.prev.next = null;
    }
    next2.prev = prev;
    next2.e.prev = prev && prev.e;
  }
}
function flatten(blockers, sync, async, fn) {
  const d = derived$1;
  if (async.length === 0 && blockers.length === 0) {
    fn(sync.map(d));
    return;
  }
  var batch = current_batch;
  var parent = (
    /** @type {Effect} */
    active_effect
  );
  var restore = capture();
  function run() {
    Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then((result) => {
      restore();
      try {
        fn([...sync.map(d), ...result]);
      } catch (error) {
        if ((parent.f & DESTROYED) === 0) {
          invoke_error_boundary(error, parent);
        }
      }
      batch == null ? void 0 : batch.deactivate();
      unset_context();
    }).catch((error) => {
      invoke_error_boundary(error, parent);
    });
  }
  if (blockers.length > 0) {
    Promise.all(blockers).then(() => {
      restore();
      try {
        return run();
      } finally {
        batch == null ? void 0 : batch.deactivate();
        unset_context();
      }
    });
  } else {
    run();
  }
}
function capture() {
  var previous_effect = active_effect;
  var previous_reaction = active_reaction;
  var previous_component_context = component_context;
  var previous_batch = current_batch;
  return function restore(activate_batch = true) {
    set_active_effect(previous_effect);
    set_active_reaction(previous_reaction);
    set_component_context(previous_component_context);
    if (activate_batch) previous_batch == null ? void 0 : previous_batch.activate();
  };
}
function unset_context() {
  set_active_effect(null);
  set_active_reaction(null);
  set_component_context(null);
}
// @__NO_SIDE_EFFECTS__
function derived$1(fn) {
  var flags2 = DERIVED | DIRTY;
  var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
    /** @type {Derived} */
    active_reaction
  ) : null;
  if (active_effect !== null) {
    active_effect.f |= EFFECT_PRESERVED;
  }
  const signal = {
    ctx: component_context,
    deps: null,
    effects: null,
    equals,
    f: flags2,
    fn,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      UNINITIALIZED
    ),
    wv: 0,
    parent: parent_derived ?? active_effect,
    ac: null
  };
  return signal;
}
// @__NO_SIDE_EFFECTS__
function async_derived(fn, location2) {
  let parent = (
    /** @type {Effect | null} */
    active_effect
  );
  if (parent === null) {
    async_derived_orphan();
  }
  var boundary2 = (
    /** @type {Boundary} */
    parent.b
  );
  var promise = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  );
  var signal = source(
    /** @type {V} */
    UNINITIALIZED
  );
  var should_suspend = !active_reaction;
  var deferreds = /* @__PURE__ */ new Map();
  async_effect(() => {
    var _a2;
    var d = deferred();
    promise = d.promise;
    try {
      Promise.resolve(fn()).then(d.resolve, d.reject).then(() => {
        if (batch === current_batch && batch.committed) {
          batch.deactivate();
        }
        unset_context();
      });
    } catch (error) {
      d.reject(error);
      unset_context();
    }
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    if (should_suspend) {
      var blocking = !boundary2.is_pending();
      boundary2.update_pending_count(1);
      batch.increment(blocking);
      (_a2 = deferreds.get(batch)) == null ? void 0 : _a2.reject(STALE_REACTION);
      deferreds.delete(batch);
      deferreds.set(batch, d);
    }
    const handler = (value, error = void 0) => {
      batch.activate();
      if (error) {
        if (error !== STALE_REACTION) {
          signal.f |= ERROR_VALUE;
          internal_set(signal, error);
        }
      } else {
        if ((signal.f & ERROR_VALUE) !== 0) {
          signal.f ^= ERROR_VALUE;
        }
        internal_set(signal, value);
        for (const [b, d2] of deferreds) {
          deferreds.delete(b);
          if (b === batch) break;
          d2.reject(STALE_REACTION);
        }
      }
      if (should_suspend) {
        boundary2.update_pending_count(-1);
        batch.decrement(blocking);
      }
    };
    d.promise.then(handler, (e) => handler(null, e || "unknown"));
  });
  teardown(() => {
    for (const d of deferreds.values()) {
      d.reject(STALE_REACTION);
    }
  });
  return new Promise((fulfil) => {
    function next2(p) {
      function go() {
        if (p === promise) {
          fulfil(signal);
        } else {
          next2(promise);
        }
      }
      p.then(go, go);
    }
    next2(promise);
  });
}
// @__NO_SIDE_EFFECTS__
function user_derived(fn) {
  const d = /* @__PURE__ */ derived$1(fn);
  push_reaction_value(d);
  return d;
}
// @__NO_SIDE_EFFECTS__
function derived_safe_equal(fn) {
  const signal = /* @__PURE__ */ derived$1(fn);
  signal.equals = safe_equals;
  return signal;
}
function destroy_derived_effects(derived2) {
  var effects = derived2.effects;
  if (effects !== null) {
    derived2.effects = null;
    for (var i = 0; i < effects.length; i += 1) {
      destroy_effect(
        /** @type {Effect} */
        effects[i]
      );
    }
  }
}
function get_derived_parent_effect(derived2) {
  var parent = derived2.parent;
  while (parent !== null) {
    if ((parent.f & DERIVED) === 0) {
      return (parent.f & DESTROYED) === 0 ? (
        /** @type {Effect} */
        parent
      ) : null;
    }
    parent = parent.parent;
  }
  return null;
}
function execute_derived(derived2) {
  var value;
  var prev_active_effect = active_effect;
  set_active_effect(get_derived_parent_effect(derived2));
  {
    try {
      derived2.f &= ~WAS_MARKED;
      destroy_derived_effects(derived2);
      value = update_reaction(derived2);
    } finally {
      set_active_effect(prev_active_effect);
    }
  }
  return value;
}
function update_derived(derived2) {
  var value = execute_derived(derived2);
  if (!derived2.equals(value)) {
    if (!(current_batch == null ? void 0 : current_batch.is_fork)) {
      derived2.v = value;
    }
    derived2.wv = increment_write_version();
  }
  if (is_destroying_effect) {
    return;
  }
  if (batch_values !== null) {
    if (effect_tracking()) {
      batch_values.set(derived2, value);
    }
  } else {
    var status = (derived2.f & CONNECTED) === 0 ? MAYBE_DIRTY : CLEAN;
    set_signal_status(derived2, status);
  }
}
let eager_effects = /* @__PURE__ */ new Set();
const old_values = /* @__PURE__ */ new Map();
let eager_effects_deferred = false;
function source(v, stack) {
  var signal = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v,
    reactions: null,
    equals,
    rv: 0,
    wv: 0
  };
  return signal;
}
// @__NO_SIDE_EFFECTS__
function state(v, stack) {
  const s = source(v);
  push_reaction_value(s);
  return s;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value, immutable = false, trackable = true) {
  const s = source(initial_value);
  if (!immutable) {
    s.equals = safe_equals;
  }
  return s;
}
function set(source2, value, should_proxy = false) {
  if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 && !(current_sources == null ? void 0 : current_sources.includes(source2))) {
    state_unsafe_mutation();
  }
  let new_value = should_proxy ? proxy(value) : value;
  return internal_set(source2, new_value);
}
function internal_set(source2, value) {
  if (!source2.equals(value)) {
    var old_value = source2.v;
    if (is_destroying_effect) {
      old_values.set(source2, value);
    } else {
      old_values.set(source2, old_value);
    }
    source2.v = value;
    var batch = Batch.ensure();
    batch.capture(source2, old_value);
    if ((source2.f & DERIVED) !== 0) {
      if ((source2.f & DIRTY) !== 0) {
        execute_derived(
          /** @type {Derived} */
          source2
        );
      }
      set_signal_status(source2, (source2.f & CONNECTED) !== 0 ? CLEAN : MAYBE_DIRTY);
    }
    source2.wv = increment_write_version();
    mark_reactions(source2, DIRTY);
    if (active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
      if (untracked_writes === null) {
        set_untracked_writes([source2]);
      } else {
        untracked_writes.push(source2);
      }
    }
    if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
      flush_eager_effects();
    }
  }
  return value;
}
function flush_eager_effects() {
  eager_effects_deferred = false;
  var prev_is_updating_effect = is_updating_effect;
  set_is_updating_effect(true);
  const inspects = Array.from(eager_effects);
  try {
    for (const effect2 of inspects) {
      if ((effect2.f & CLEAN) !== 0) {
        set_signal_status(effect2, MAYBE_DIRTY);
      }
      if (is_dirty(effect2)) {
        update_effect(effect2);
      }
    }
  } finally {
    set_is_updating_effect(prev_is_updating_effect);
  }
  eager_effects.clear();
}
function increment(source2) {
  set(source2, source2.v + 1);
}
function mark_reactions(signal, status) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags2 = reaction.f;
    var not_dirty = (flags2 & DIRTY) === 0;
    if (not_dirty) {
      set_signal_status(reaction, status);
    }
    if ((flags2 & DERIVED) !== 0) {
      var derived2 = (
        /** @type {Derived} */
        reaction
      );
      batch_values == null ? void 0 : batch_values.delete(derived2);
      if ((flags2 & WAS_MARKED) === 0) {
        if (flags2 & CONNECTED) {
          reaction.f |= WAS_MARKED;
        }
        mark_reactions(derived2, MAYBE_DIRTY);
      }
    } else if (not_dirty) {
      if ((flags2 & BLOCK_EFFECT) !== 0) {
        if (eager_block_effects !== null) {
          eager_block_effects.add(
            /** @type {Effect} */
            reaction
          );
        }
      }
      schedule_effect(
        /** @type {Effect} */
        reaction
      );
    }
  }
}
function proxy(value) {
  if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
    return value;
  }
  const prototype = get_prototype_of(value);
  if (prototype !== object_prototype && prototype !== array_prototype) {
    return value;
  }
  var sources = /* @__PURE__ */ new Map();
  var is_proxied_array = is_array(value);
  var version = /* @__PURE__ */ state(0);
  var parent_version = update_version;
  var with_parent = (fn) => {
    if (update_version === parent_version) {
      return fn();
    }
    var reaction = active_reaction;
    var version2 = update_version;
    set_active_reaction(null);
    set_update_version(parent_version);
    var result = fn();
    set_active_reaction(reaction);
    set_update_version(version2);
    return result;
  };
  if (is_proxied_array) {
    sources.set("length", /* @__PURE__ */ state(
      /** @type {any[]} */
      value.length
    ));
  }
  return new Proxy(
    /** @type {any} */
    value,
    {
      defineProperty(_, prop2, descriptor) {
        if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
          state_descriptors_fixed();
        }
        var s = sources.get(prop2);
        if (s === void 0) {
          s = with_parent(() => {
            var s2 = /* @__PURE__ */ state(descriptor.value);
            sources.set(prop2, s2);
            return s2;
          });
        } else {
          set(s, descriptor.value, true);
        }
        return true;
      },
      deleteProperty(target, prop2) {
        var s = sources.get(prop2);
        if (s === void 0) {
          if (prop2 in target) {
            const s2 = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
            sources.set(prop2, s2);
            increment(version);
          }
        } else {
          set(s, UNINITIALIZED);
          increment(version);
        }
        return true;
      },
      get(target, prop2, receiver) {
        var _a2;
        if (prop2 === STATE_SYMBOL) {
          return value;
        }
        var s = sources.get(prop2);
        var exists = prop2 in target;
        if (s === void 0 && (!exists || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable))) {
          s = with_parent(() => {
            var p = proxy(exists ? target[prop2] : UNINITIALIZED);
            var s2 = /* @__PURE__ */ state(p);
            return s2;
          });
          sources.set(prop2, s);
        }
        if (s !== void 0) {
          var v = get$1(s);
          return v === UNINITIALIZED ? void 0 : v;
        }
        return Reflect.get(target, prop2, receiver);
      },
      getOwnPropertyDescriptor(target, prop2) {
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        if (descriptor && "value" in descriptor) {
          var s = sources.get(prop2);
          if (s) descriptor.value = get$1(s);
        } else if (descriptor === void 0) {
          var source2 = sources.get(prop2);
          var value2 = source2 == null ? void 0 : source2.v;
          if (source2 !== void 0 && value2 !== UNINITIALIZED) {
            return {
              enumerable: true,
              configurable: true,
              value: value2,
              writable: true
            };
          }
        }
        return descriptor;
      },
      has(target, prop2) {
        var _a2;
        if (prop2 === STATE_SYMBOL) {
          return true;
        }
        var s = sources.get(prop2);
        var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
        if (s !== void 0 || active_effect !== null && (!has || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable))) {
          if (s === void 0) {
            s = with_parent(() => {
              var p = has ? proxy(target[prop2]) : UNINITIALIZED;
              var s2 = /* @__PURE__ */ state(p);
              return s2;
            });
            sources.set(prop2, s);
          }
          var value2 = get$1(s);
          if (value2 === UNINITIALIZED) {
            return false;
          }
        }
        return has;
      },
      set(target, prop2, value2, receiver) {
        var _a2;
        var s = sources.get(prop2);
        var has = prop2 in target;
        if (is_proxied_array && prop2 === "length") {
          for (var i = value2; i < /** @type {Source<number>} */
          s.v; i += 1) {
            var other_s = sources.get(i + "");
            if (other_s !== void 0) {
              set(other_s, UNINITIALIZED);
            } else if (i in target) {
              other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
              sources.set(i + "", other_s);
            }
          }
        }
        if (s === void 0) {
          if (!has || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable)) {
            s = with_parent(() => /* @__PURE__ */ state(void 0));
            set(s, proxy(value2));
            sources.set(prop2, s);
          }
        } else {
          has = s.v !== UNINITIALIZED;
          var p = with_parent(() => proxy(value2));
          set(s, p);
        }
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        if (descriptor == null ? void 0 : descriptor.set) {
          descriptor.set.call(receiver, value2);
        }
        if (!has) {
          if (is_proxied_array && typeof prop2 === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop2);
            if (Number.isInteger(n) && n >= ls.v) {
              set(ls, n + 1);
            }
          }
          increment(version);
        }
        return true;
      },
      ownKeys(target) {
        get$1(version);
        var own_keys = Reflect.ownKeys(target).filter((key2) => {
          var source3 = sources.get(key2);
          return source3 === void 0 || source3.v !== UNINITIALIZED;
        });
        for (var [key, source2] of sources) {
          if (source2.v !== UNINITIALIZED && !(key in target)) {
            own_keys.push(key);
          }
        }
        return own_keys;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      }
    }
  );
}
var $window;
var is_firefox;
var first_child_getter;
var next_sibling_getter;
function init_operations() {
  if ($window !== void 0) {
    return;
  }
  $window = window;
  is_firefox = /Firefox/.test(navigator.userAgent);
  var element_prototype = Element.prototype;
  var node_prototype = Node.prototype;
  var text_prototype = Text.prototype;
  first_child_getter = get_descriptor(node_prototype, "firstChild").get;
  next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
  if (is_extensible(element_prototype)) {
    element_prototype.__click = void 0;
    element_prototype.__className = void 0;
    element_prototype.__attributes = null;
    element_prototype.__style = void 0;
    element_prototype.__e = void 0;
  }
  if (is_extensible(text_prototype)) {
    text_prototype.__t = void 0;
  }
}
function create_text(value = "") {
  return document.createTextNode(value);
}
// @__NO_SIDE_EFFECTS__
function get_first_child(node) {
  return first_child_getter.call(node);
}
// @__NO_SIDE_EFFECTS__
function get_next_sibling(node) {
  return next_sibling_getter.call(node);
}
function child(node, is_text) {
  if (!hydrating) {
    return /* @__PURE__ */ get_first_child(node);
  }
  var child2 = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ get_first_child(hydrate_node)
  );
  if (child2 === null) {
    child2 = hydrate_node.appendChild(create_text());
  }
  set_hydrate_node(child2);
  return child2;
}
function first_child(fragment, is_text = false) {
  if (!hydrating) {
    var first = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ get_first_child(
        /** @type {Node} */
        fragment
      )
    );
    if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
    return first;
  }
  if (is_text && (hydrate_node == null ? void 0 : hydrate_node.nodeType) !== TEXT_NODE) {
    var text = create_text();
    hydrate_node == null ? void 0 : hydrate_node.before(text);
    set_hydrate_node(text);
    return text;
  }
  return hydrate_node;
}
function sibling(node, count = 1, is_text = false) {
  let next_sibling = hydrating ? hydrate_node : node;
  var last_sibling;
  while (count--) {
    last_sibling = next_sibling;
    next_sibling = /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(next_sibling);
  }
  if (!hydrating) {
    return next_sibling;
  }
  if (is_text && (next_sibling == null ? void 0 : next_sibling.nodeType) !== TEXT_NODE) {
    var text = create_text();
    if (next_sibling === null) {
      last_sibling == null ? void 0 : last_sibling.after(text);
    } else {
      next_sibling.before(text);
    }
    set_hydrate_node(text);
    return text;
  }
  set_hydrate_node(next_sibling);
  return (
    /** @type {TemplateNode} */
    next_sibling
  );
}
function clear_text_content(node) {
  node.textContent = "";
}
function should_defer_append() {
  return false;
}
function without_reactive_context(fn) {
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    return fn();
  } finally {
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function validate_effect(rune) {
  if (active_effect === null) {
    if (active_reaction === null) {
      effect_orphan();
    }
    effect_in_unowned_derived();
  }
  if (is_destroying_effect) {
    effect_in_teardown();
  }
}
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
function create_effect(type, fn, sync) {
  var parent = active_effect;
  if (parent !== null && (parent.f & INERT) !== 0) {
    type |= INERT;
  }
  var effect2 = {
    ctx: component_context,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: type | DIRTY | CONNECTED,
    first: null,
    fn,
    last: null,
    next: null,
    parent,
    b: parent && parent.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (sync) {
    try {
      update_effect(effect2);
      effect2.f |= EFFECT_RAN;
    } catch (e2) {
      destroy_effect(effect2);
      throw e2;
    }
  } else if (fn !== null) {
    schedule_effect(effect2);
  }
  var e = effect2;
  if (sync && e.deps === null && e.teardown === null && e.nodes_start === null && e.first === e.last && // either `null`, or a singular child
  (e.f & EFFECT_PRESERVED) === 0) {
    e = e.first;
    if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
      e.f |= EFFECT_TRANSPARENT;
    }
  }
  if (e !== null) {
    e.parent = parent;
    if (parent !== null) {
      push_effect(e, parent);
    }
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type & ROOT_EFFECT) === 0) {
      var derived2 = (
        /** @type {Derived} */
        active_reaction
      );
      (derived2.effects ?? (derived2.effects = [])).push(e);
    }
  }
  return effect2;
}
function effect_tracking() {
  return active_reaction !== null && !untracking;
}
function teardown(fn) {
  const effect2 = create_effect(RENDER_EFFECT, null, false);
  set_signal_status(effect2, CLEAN);
  effect2.teardown = fn;
  return effect2;
}
function user_effect(fn) {
  validate_effect();
  var flags2 = (
    /** @type {Effect} */
    active_effect.f
  );
  var defer = !active_reaction && (flags2 & BRANCH_EFFECT) !== 0 && (flags2 & EFFECT_RAN) === 0;
  if (defer) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    (context.e ?? (context.e = [])).push(fn);
  } else {
    return create_user_effect(fn);
  }
}
function create_user_effect(fn) {
  return create_effect(EFFECT | USER_EFFECT, fn, false);
}
function effect_root(fn) {
  Batch.ensure();
  const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn, true);
  return () => {
    destroy_effect(effect2);
  };
}
function component_root(fn) {
  Batch.ensure();
  const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn, true);
  return (options = {}) => {
    return new Promise((fulfil) => {
      if (options.outro) {
        pause_effect(effect2, () => {
          destroy_effect(effect2);
          fulfil(void 0);
        });
      } else {
        destroy_effect(effect2);
        fulfil(void 0);
      }
    });
  };
}
function effect(fn) {
  return create_effect(EFFECT, fn, false);
}
function async_effect(fn) {
  return create_effect(ASYNC | EFFECT_PRESERVED, fn, true);
}
function render_effect(fn, flags2 = 0) {
  return create_effect(RENDER_EFFECT | flags2, fn, true);
}
function template_effect(fn, sync = [], async = [], blockers = []) {
  flatten(blockers, sync, async, (values) => {
    create_effect(RENDER_EFFECT, () => fn(...values.map(get$1)), true);
  });
}
function block(fn, flags2 = 0) {
  var effect2 = create_effect(BLOCK_EFFECT | flags2, fn, true);
  return effect2;
}
function branch(fn) {
  return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn, true);
}
function execute_effect_teardown(effect2) {
  var teardown2 = effect2.teardown;
  if (teardown2 !== null) {
    const previously_destroying_effect = is_destroying_effect;
    const previous_reaction = active_reaction;
    set_is_destroying_effect(true);
    set_active_reaction(null);
    try {
      teardown2.call(null);
    } finally {
      set_is_destroying_effect(previously_destroying_effect);
      set_active_reaction(previous_reaction);
    }
  }
}
function destroy_effect_children(signal, remove_dom = false) {
  var effect2 = signal.first;
  signal.first = signal.last = null;
  while (effect2 !== null) {
    const controller = effect2.ac;
    if (controller !== null) {
      without_reactive_context(() => {
        controller.abort(STALE_REACTION);
      });
    }
    var next2 = effect2.next;
    if ((effect2.f & ROOT_EFFECT) !== 0) {
      effect2.parent = null;
    } else {
      destroy_effect(effect2, remove_dom);
    }
    effect2 = next2;
  }
}
function destroy_block_effect_children(signal) {
  var effect2 = signal.first;
  while (effect2 !== null) {
    var next2 = effect2.next;
    if ((effect2.f & BRANCH_EFFECT) === 0) {
      destroy_effect(effect2);
    }
    effect2 = next2;
  }
}
function destroy_effect(effect2, remove_dom = true) {
  var removed = false;
  if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null && effect2.nodes_end !== null) {
    remove_effect_dom(
      effect2.nodes_start,
      /** @type {TemplateNode} */
      effect2.nodes_end
    );
    removed = true;
  }
  destroy_effect_children(effect2, remove_dom && !removed);
  remove_reactions(effect2, 0);
  set_signal_status(effect2, DESTROYED);
  var transitions = effect2.transitions;
  if (transitions !== null) {
    for (const transition of transitions) {
      transition.stop();
    }
  }
  execute_effect_teardown(effect2);
  var parent = effect2.parent;
  if (parent !== null && parent.first !== null) {
    unlink_effect(effect2);
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes_start = effect2.nodes_end = effect2.ac = null;
}
function remove_effect_dom(node, end) {
  while (node !== null) {
    var next2 = node === end ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node)
    );
    node.remove();
    node = next2;
  }
}
function unlink_effect(effect2) {
  var parent = effect2.parent;
  var prev = effect2.prev;
  var next2 = effect2.next;
  if (prev !== null) prev.next = next2;
  if (next2 !== null) next2.prev = prev;
  if (parent !== null) {
    if (parent.first === effect2) parent.first = next2;
    if (parent.last === effect2) parent.last = prev;
  }
}
function pause_effect(effect2, callback, destroy = true) {
  var transitions = [];
  pause_children(effect2, transitions, true);
  run_out_transitions(transitions, () => {
    if (destroy) destroy_effect(effect2);
    if (callback) callback();
  });
}
function run_out_transitions(transitions, fn) {
  var remaining = transitions.length;
  if (remaining > 0) {
    var check = () => --remaining || fn();
    for (var transition of transitions) {
      transition.out(check);
    }
  } else {
    fn();
  }
}
function pause_children(effect2, transitions, local) {
  if ((effect2.f & INERT) !== 0) return;
  effect2.f ^= INERT;
  if (effect2.transitions !== null) {
    for (const transition of effect2.transitions) {
      if (transition.is_global || local) {
        transitions.push(transition);
      }
    }
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
    // it means the parent block effect was pruned. In that case,
    // transparency information was transferred to the branch effect.
    (child2.f & BRANCH_EFFECT) !== 0 && (effect2.f & BLOCK_EFFECT) !== 0;
    pause_children(child2, transitions, transparent ? local : false);
    child2 = sibling2;
  }
}
function resume_effect(effect2) {
  resume_children(effect2, true);
}
function resume_children(effect2, local) {
  if ((effect2.f & INERT) === 0) return;
  effect2.f ^= INERT;
  if ((effect2.f & CLEAN) === 0) {
    set_signal_status(effect2, DIRTY);
    schedule_effect(effect2);
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
    resume_children(child2, transparent ? local : false);
    child2 = sibling2;
  }
  if (effect2.transitions !== null) {
    for (const transition of effect2.transitions) {
      if (transition.is_global || local) {
        transition.in();
      }
    }
  }
}
function move_effect(effect2, fragment) {
  var node = effect2.nodes_start;
  var end = effect2.nodes_end;
  while (node !== null) {
    var next2 = node === end ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node)
    );
    fragment.append(node);
    node = next2;
  }
}
let is_updating_effect = false;
function set_is_updating_effect(value) {
  is_updating_effect = value;
}
let is_destroying_effect = false;
function set_is_destroying_effect(value) {
  is_destroying_effect = value;
}
let active_reaction = null;
let untracking = false;
function set_active_reaction(reaction) {
  active_reaction = reaction;
}
let active_effect = null;
function set_active_effect(effect2) {
  active_effect = effect2;
}
let current_sources = null;
function push_reaction_value(value) {
  if (active_reaction !== null && true) {
    if (current_sources === null) {
      current_sources = [value];
    } else {
      current_sources.push(value);
    }
  }
}
let new_deps = null;
let skipped_deps = 0;
let untracked_writes = null;
function set_untracked_writes(value) {
  untracked_writes = value;
}
let write_version = 1;
let read_version = 0;
let update_version = read_version;
function set_update_version(value) {
  update_version = value;
}
function increment_write_version() {
  return ++write_version;
}
function is_dirty(reaction) {
  var flags2 = reaction.f;
  if ((flags2 & DIRTY) !== 0) {
    return true;
  }
  if (flags2 & DERIVED) {
    reaction.f &= ~WAS_MARKED;
  }
  if ((flags2 & MAYBE_DIRTY) !== 0) {
    var dependencies = reaction.deps;
    if (dependencies !== null) {
      var length = dependencies.length;
      for (var i = 0; i < length; i++) {
        var dependency = dependencies[i];
        if (is_dirty(
          /** @type {Derived} */
          dependency
        )) {
          update_derived(
            /** @type {Derived} */
            dependency
          );
        }
        if (dependency.wv > reaction.wv) {
          return true;
        }
      }
    }
    if ((flags2 & CONNECTED) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    batch_values === null) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  if (current_sources == null ? void 0 : current_sources.includes(signal)) {
    return;
  }
  for (var i = 0; i < reactions.length; i++) {
    var reaction = reactions[i];
    if ((reaction.f & DERIVED) !== 0) {
      schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        reaction,
        effect2,
        false
      );
    } else if (effect2 === reaction) {
      if (root2) {
        set_signal_status(reaction, DIRTY);
      } else if ((reaction.f & CLEAN) !== 0) {
        set_signal_status(reaction, MAYBE_DIRTY);
      }
      schedule_effect(
        /** @type {Effect} */
        reaction
      );
    }
  }
}
function update_reaction(reaction) {
  var _a2;
  var previous_deps = new_deps;
  var previous_skipped_deps = skipped_deps;
  var previous_untracked_writes = untracked_writes;
  var previous_reaction = active_reaction;
  var previous_sources = current_sources;
  var previous_component_context = component_context;
  var previous_untracking = untracking;
  var previous_update_version = update_version;
  var flags2 = reaction.f;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  untracked_writes = null;
  active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  current_sources = null;
  set_component_context(reaction.ctx);
  untracking = false;
  update_version = ++read_version;
  if (reaction.ac !== null) {
    without_reactive_context(() => {
      reaction.ac.abort(STALE_REACTION);
    });
    reaction.ac = null;
  }
  try {
    reaction.f |= REACTION_IS_UPDATING;
    var fn = (
      /** @type {Function} */
      reaction.fn
    );
    var result = fn();
    var deps = reaction.deps;
    if (new_deps !== null) {
      var i;
      remove_reactions(reaction, skipped_deps);
      if (deps !== null && skipped_deps > 0) {
        deps.length = skipped_deps + new_deps.length;
        for (i = 0; i < new_deps.length; i++) {
          deps[skipped_deps + i] = new_deps[i];
        }
      } else {
        reaction.deps = deps = new_deps;
      }
      if (is_updating_effect && effect_tracking() && (reaction.f & CONNECTED) !== 0) {
        for (i = skipped_deps; i < deps.length; i++) {
          ((_a2 = deps[i]).reactions ?? (_a2.reactions = [])).push(reaction);
        }
      }
    } else if (deps !== null && skipped_deps < deps.length) {
      remove_reactions(reaction, skipped_deps);
      deps.length = skipped_deps;
    }
    if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
      for (i = 0; i < /** @type {Source[]} */
      untracked_writes.length; i++) {
        schedule_possible_effect_self_invalidation(
          untracked_writes[i],
          /** @type {Effect} */
          reaction
        );
      }
    }
    if (previous_reaction !== null && previous_reaction !== reaction) {
      read_version++;
      if (untracked_writes !== null) {
        if (previous_untracked_writes === null) {
          previous_untracked_writes = untracked_writes;
        } else {
          previous_untracked_writes.push(.../** @type {Source[]} */
          untracked_writes);
        }
      }
    }
    if ((reaction.f & ERROR_VALUE) !== 0) {
      reaction.f ^= ERROR_VALUE;
    }
    return result;
  } catch (error) {
    return handle_error(error);
  } finally {
    reaction.f ^= REACTION_IS_UPDATING;
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    untracked_writes = previous_untracked_writes;
    active_reaction = previous_reaction;
    current_sources = previous_sources;
    set_component_context(previous_component_context);
    untracking = previous_untracking;
    update_version = previous_update_version;
  }
}
function remove_reaction(signal, dependency) {
  let reactions = dependency.reactions;
  if (reactions !== null) {
    var index2 = index_of.call(reactions, signal);
    if (index2 !== -1) {
      var new_length = reactions.length - 1;
      if (new_length === 0) {
        reactions = dependency.reactions = null;
      } else {
        reactions[index2] = reactions[new_length];
        reactions.pop();
      }
    }
  }
  if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !new_deps.includes(dependency))) {
    set_signal_status(dependency, MAYBE_DIRTY);
    if ((dependency.f & CONNECTED) !== 0) {
      dependency.f ^= CONNECTED;
      dependency.f &= ~WAS_MARKED;
    }
    destroy_derived_effects(
      /** @type {Derived} **/
      dependency
    );
    remove_reactions(
      /** @type {Derived} **/
      dependency,
      0
    );
  }
}
function remove_reactions(signal, start_index) {
  var dependencies = signal.deps;
  if (dependencies === null) return;
  for (var i = start_index; i < dependencies.length; i++) {
    remove_reaction(signal, dependencies[i]);
  }
}
function update_effect(effect2) {
  var flags2 = effect2.f;
  if ((flags2 & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var previous_effect = active_effect;
  var was_updating_effect = is_updating_effect;
  active_effect = effect2;
  is_updating_effect = true;
  try {
    if ((flags2 & BLOCK_EFFECT) !== 0) {
      destroy_block_effect_children(effect2);
    } else {
      destroy_effect_children(effect2);
    }
    execute_effect_teardown(effect2);
    var teardown2 = update_reaction(effect2);
    effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
    effect2.wv = write_version;
    var dep;
    if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) ;
  } finally {
    is_updating_effect = was_updating_effect;
    active_effect = previous_effect;
  }
}
function get$1(signal) {
  var flags2 = signal.f;
  var is_derived = (flags2 & DERIVED) !== 0;
  if (active_reaction !== null && !untracking) {
    var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
    if (!destroyed && !(current_sources == null ? void 0 : current_sources.includes(signal))) {
      var deps = active_reaction.deps;
      if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
        if (signal.rv < read_version) {
          signal.rv = read_version;
          if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
            skipped_deps++;
          } else if (new_deps === null) {
            new_deps = [signal];
          } else if (!new_deps.includes(signal)) {
            new_deps.push(signal);
          }
        }
      } else {
        (active_reaction.deps ?? (active_reaction.deps = [])).push(signal);
        var reactions = signal.reactions;
        if (reactions === null) {
          signal.reactions = [active_reaction];
        } else if (!reactions.includes(active_reaction)) {
          reactions.push(active_reaction);
        }
      }
    }
  }
  if (is_destroying_effect) {
    if (old_values.has(signal)) {
      return old_values.get(signal);
    }
    if (is_derived) {
      var derived2 = (
        /** @type {Derived} */
        signal
      );
      var value = derived2.v;
      if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
        value = execute_derived(derived2);
      }
      old_values.set(derived2, value);
      return value;
    }
  } else if (is_derived && !(batch_values == null ? void 0 : batch_values.has(signal))) {
    derived2 = /** @type {Derived} */
    signal;
    if (is_dirty(derived2)) {
      update_derived(derived2);
    }
    if (is_updating_effect && effect_tracking() && (derived2.f & CONNECTED) === 0) {
      reconnect(derived2);
    }
  }
  if (batch_values == null ? void 0 : batch_values.has(signal)) {
    return batch_values.get(signal);
  }
  if ((signal.f & ERROR_VALUE) !== 0) {
    throw signal.v;
  }
  return signal.v;
}
function reconnect(derived2) {
  if (derived2.deps === null) return;
  derived2.f ^= CONNECTED;
  for (const dep of derived2.deps) {
    (dep.reactions ?? (dep.reactions = [])).push(derived2);
    if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
      reconnect(
        /** @type {Derived} */
        dep
      );
    }
  }
}
function depends_on_old_values(derived2) {
  if (derived2.v === UNINITIALIZED) return true;
  if (derived2.deps === null) return false;
  for (const dep of derived2.deps) {
    if (old_values.has(dep)) {
      return true;
    }
    if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
      /** @type {Derived} */
      dep
    )) {
      return true;
    }
  }
  return false;
}
function untrack(fn) {
  var previous_untracking = untracking;
  try {
    untracking = true;
    return fn();
  } finally {
    untracking = previous_untracking;
  }
}
const STATUS_MASK = -7169;
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function deep_read_state(value) {
  if (typeof value !== "object" || !value || value instanceof EventTarget) {
    return;
  }
  if (STATE_SYMBOL in value) {
    deep_read(value);
  } else if (!Array.isArray(value)) {
    for (let key in value) {
      const prop2 = value[key];
      if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
        deep_read(prop2);
      }
    }
  }
}
function deep_read(value, visited = /* @__PURE__ */ new Set()) {
  if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
  !(value instanceof EventTarget) && !visited.has(value)) {
    visited.add(value);
    if (value instanceof Date) {
      value.getTime();
    }
    for (let key in value) {
      try {
        deep_read(value[key], visited);
      } catch (e) {
      }
    }
    const proto = get_prototype_of(value);
    if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
      const descriptors = get_descriptors(proto);
      for (let key in descriptors) {
        const get2 = descriptors[key].get;
        if (get2) {
          try {
            get2.call(value);
          } catch (e) {
          }
        }
      }
    }
  }
}
const all_registered_events = /* @__PURE__ */ new Set();
const root_event_handles = /* @__PURE__ */ new Set();
function create_event(event_name, dom, handler, options = {}) {
  function target_handler(event2) {
    if (!options.capture) {
      handle_event_propagation.call(dom, event2);
    }
    if (!event2.cancelBubble) {
      return without_reactive_context(() => {
        return handler == null ? void 0 : handler.call(this, event2);
      });
    }
  }
  if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
    queue_micro_task(() => {
      dom.addEventListener(event_name, target_handler, options);
    });
  } else {
    dom.addEventListener(event_name, target_handler, options);
  }
  return target_handler;
}
function event(event_name, dom, handler, capture2, passive) {
  var options = { capture: capture2, passive };
  var target_handler = create_event(event_name, dom, handler, options);
  if (dom === document.body || // @ts-ignore
  dom === window || // @ts-ignore
  dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  dom instanceof HTMLMediaElement) {
    teardown(() => {
      dom.removeEventListener(event_name, target_handler, options);
    });
  }
}
let last_propagated_event = null;
function handle_event_propagation(event2) {
  var _a2;
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event2.type;
  var path = ((_a2 = event2.composedPath) == null ? void 0 : _a2.call(event2)) || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event2.target
  );
  last_propagated_event = event2;
  var path_idx = 0;
  var handled_at = last_propagated_event === event2 && event2.__root;
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event2.__root = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event2.target;
  if (current_target === handler_element) return;
  define_property(event2, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
      current_target.host || null;
      try {
        var delegated = current_target["__" + event_name];
        if (delegated != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event2.target === current_target)) {
          delegated.call(current_target, event2);
        }
      } catch (error) {
        if (throw_error) {
          other_errors.push(error);
        } else {
          throw_error = error;
        }
      }
      if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
        break;
      }
      current_target = parent_element;
    }
    if (throw_error) {
      for (let error of other_errors) {
        queueMicrotask(() => {
          throw error;
        });
      }
      throw throw_error;
    }
  } finally {
    event2.__root = handler_element;
    delete event2.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function create_fragment_from_html(html) {
  var elem = document.createElement("template");
  elem.innerHTML = html.replaceAll("<!>", "<!---->");
  return elem.content;
}
function assign_nodes(start, end) {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  if (effect2.nodes_start === null) {
    effect2.nodes_start = start;
    effect2.nodes_end = end;
  }
}
// @__NO_SIDE_EFFECTS__
function from_html(content, flags2) {
  var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
  var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
  var node;
  var has_start = !content.startsWith("<!>");
  return () => {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    if (node === void 0) {
      node = create_fragment_from_html(has_start ? content : "<!>" + content);
      if (!is_fragment) node = /** @type {Node} */
      /* @__PURE__ */ get_first_child(node);
    }
    var clone2 = (
      /** @type {TemplateNode} */
      use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
    );
    if (is_fragment) {
      var start = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(clone2)
      );
      var end = (
        /** @type {TemplateNode} */
        clone2.lastChild
      );
      assign_nodes(start, end);
    } else {
      assign_nodes(clone2, clone2);
    }
    return clone2;
  };
}
function comment() {
  if (hydrating) {
    assign_nodes(hydrate_node, null);
    return hydrate_node;
  }
  var frag = document.createDocumentFragment();
  var start = document.createComment("");
  var anchor = create_text();
  frag.append(start, anchor);
  assign_nodes(start, anchor);
  return frag;
}
function append(anchor, dom) {
  if (hydrating) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if ((effect2.f & EFFECT_RAN) === 0 || effect2.nodes_end === null) {
      effect2.nodes_end = hydrate_node;
    }
    hydrate_next();
    return;
  }
  if (anchor === null) {
    return;
  }
  anchor.before(
    /** @type {Node} */
    dom
  );
}
const PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(name) {
  return PASSIVE_EVENTS.includes(name);
}
function mount(component2, options) {
  return _mount(component2, options);
}
function hydrate(component2, options) {
  init_operations();
  options.intro = options.intro ?? false;
  const target = options.target;
  const was_hydrating = hydrating;
  const previous_hydrate_node = hydrate_node;
  try {
    var anchor = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(target)
    );
    while (anchor && (anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */
    anchor.data !== HYDRATION_START)) {
      anchor = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(anchor);
    }
    if (!anchor) {
      throw HYDRATION_ERROR;
    }
    set_hydrating(true);
    set_hydrate_node(
      /** @type {Comment} */
      anchor
    );
    const instance = _mount(component2, { ...options, anchor });
    set_hydrating(false);
    return (
      /**  @type {Exports} */
      instance
    );
  } catch (error) {
    if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) {
      throw error;
    }
    if (error !== HYDRATION_ERROR) {
      console.warn("Failed to hydrate: ", error);
    }
    if (options.recover === false) {
      hydration_failed();
    }
    init_operations();
    clear_text_content(target);
    set_hydrating(false);
    return mount(component2, options);
  } finally {
    set_hydrating(was_hydrating);
    set_hydrate_node(previous_hydrate_node);
  }
}
const document_listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
  init_operations();
  var registered_events = /* @__PURE__ */ new Set();
  var event_handle = (events2) => {
    for (var i = 0; i < events2.length; i++) {
      var event_name = events2[i];
      if (registered_events.has(event_name)) continue;
      registered_events.add(event_name);
      var passive = is_passive_event(event_name);
      target.addEventListener(event_name, handle_event_propagation, { passive });
      var n = document_listeners.get(event_name);
      if (n === void 0) {
        document.addEventListener(event_name, handle_event_propagation, { passive });
        document_listeners.set(event_name, 1);
      } else {
        document_listeners.set(event_name, n + 1);
      }
    }
  };
  event_handle(array_from(all_registered_events));
  root_event_handles.add(event_handle);
  var component2 = void 0;
  var unmount2 = component_root(() => {
    var anchor_node = anchor ?? target.appendChild(create_text());
    boundary(
      /** @type {TemplateNode} */
      anchor_node,
      {
        pending: () => {
        }
      },
      (anchor_node2) => {
        if (context) {
          push({});
          var ctx = (
            /** @type {ComponentContext} */
            component_context
          );
          ctx.c = context;
        }
        if (events) {
          props.$$events = events;
        }
        if (hydrating) {
          assign_nodes(
            /** @type {TemplateNode} */
            anchor_node2,
            null
          );
        }
        component2 = Component(anchor_node2, props) || {};
        if (hydrating) {
          active_effect.nodes_end = hydrate_node;
          if (hydrate_node === null || hydrate_node.nodeType !== COMMENT_NODE || /** @type {Comment} */
          hydrate_node.data !== HYDRATION_END) {
            hydration_mismatch();
            throw HYDRATION_ERROR;
          }
        }
        if (context) {
          pop();
        }
      }
    );
    return () => {
      var _a2;
      for (var event_name of registered_events) {
        target.removeEventListener(event_name, handle_event_propagation);
        var n = (
          /** @type {number} */
          document_listeners.get(event_name)
        );
        if (--n === 0) {
          document.removeEventListener(event_name, handle_event_propagation);
          document_listeners.delete(event_name);
        } else {
          document_listeners.set(event_name, n);
        }
      }
      root_event_handles.delete(event_handle);
      if (anchor_node !== anchor) {
        (_a2 = anchor_node.parentNode) == null ? void 0 : _a2.removeChild(anchor_node);
      }
    };
  });
  mounted_components.set(component2, unmount2);
  return component2;
}
let mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component2, options) {
  const fn = mounted_components.get(component2);
  if (fn) {
    mounted_components.delete(component2);
    return fn(options);
  }
  return Promise.resolve();
}
class BranchManager {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(anchor, transition = true) {
    /** @type {TemplateNode} */
    __publicField(this, "anchor");
    /** @type {Map<Batch, Key>} */
    __privateAdd(this, _batches, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    __privateAdd(this, _onscreen, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    __privateAdd(this, _offscreen, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    __privateAdd(this, _outroing, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    __privateAdd(this, _transition, true);
    __privateAdd(this, _commit, () => {
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      if (!__privateGet(this, _batches).has(batch)) return;
      var key = (
        /** @type {Key} */
        __privateGet(this, _batches).get(batch)
      );
      var onscreen = __privateGet(this, _onscreen).get(key);
      if (onscreen) {
        resume_effect(onscreen);
        __privateGet(this, _outroing).delete(key);
      } else {
        var offscreen = __privateGet(this, _offscreen).get(key);
        if (offscreen) {
          __privateGet(this, _onscreen).set(key, offscreen.effect);
          __privateGet(this, _offscreen).delete(key);
          offscreen.fragment.lastChild.remove();
          this.anchor.before(offscreen.fragment);
          onscreen = offscreen.effect;
        }
      }
      for (const [b, k] of __privateGet(this, _batches)) {
        __privateGet(this, _batches).delete(b);
        if (b === batch) {
          break;
        }
        const offscreen2 = __privateGet(this, _offscreen).get(k);
        if (offscreen2) {
          destroy_effect(offscreen2.effect);
          __privateGet(this, _offscreen).delete(k);
        }
      }
      for (const [k, effect2] of __privateGet(this, _onscreen)) {
        if (k === key || __privateGet(this, _outroing).has(k)) continue;
        const on_destroy = () => {
          const keys = Array.from(__privateGet(this, _batches).values());
          if (keys.includes(k)) {
            var fragment = document.createDocumentFragment();
            move_effect(effect2, fragment);
            fragment.append(create_text());
            __privateGet(this, _offscreen).set(k, { effect: effect2, fragment });
          } else {
            destroy_effect(effect2);
          }
          __privateGet(this, _outroing).delete(k);
          __privateGet(this, _onscreen).delete(k);
        };
        if (__privateGet(this, _transition) || !onscreen) {
          __privateGet(this, _outroing).add(k);
          pause_effect(effect2, on_destroy, false);
        } else {
          on_destroy();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    __privateAdd(this, _discard, (batch) => {
      __privateGet(this, _batches).delete(batch);
      const keys = Array.from(__privateGet(this, _batches).values());
      for (const [k, branch2] of __privateGet(this, _offscreen)) {
        if (!keys.includes(k)) {
          destroy_effect(branch2.effect);
          __privateGet(this, _offscreen).delete(k);
        }
      }
    });
    this.anchor = anchor;
    __privateSet(this, _transition, transition);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(key, fn) {
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var defer = should_defer_append();
    if (fn && !__privateGet(this, _onscreen).has(key) && !__privateGet(this, _offscreen).has(key)) {
      if (defer) {
        var fragment = document.createDocumentFragment();
        var target = create_text();
        fragment.append(target);
        __privateGet(this, _offscreen).set(key, {
          effect: branch(() => fn(target)),
          fragment
        });
      } else {
        __privateGet(this, _onscreen).set(
          key,
          branch(() => fn(this.anchor))
        );
      }
    }
    __privateGet(this, _batches).set(batch, key);
    if (defer) {
      for (const [k, effect2] of __privateGet(this, _onscreen)) {
        if (k === key) {
          batch.skipped_effects.delete(effect2);
        } else {
          batch.skipped_effects.add(effect2);
        }
      }
      for (const [k, branch2] of __privateGet(this, _offscreen)) {
        if (k === key) {
          batch.skipped_effects.delete(branch2.effect);
        } else {
          batch.skipped_effects.add(branch2.effect);
        }
      }
      batch.oncommit(__privateGet(this, _commit));
      batch.ondiscard(__privateGet(this, _discard));
    } else {
      if (hydrating) {
        this.anchor = hydrate_node;
      }
      __privateGet(this, _commit).call(this);
    }
  }
}
_batches = new WeakMap();
_onscreen = new WeakMap();
_offscreen = new WeakMap();
_outroing = new WeakMap();
_transition = new WeakMap();
_commit = new WeakMap();
_discard = new WeakMap();
function snippet(node, get_snippet, ...args) {
  var branches = new BranchManager(node);
  block(() => {
    const snippet2 = get_snippet() ?? null;
    branches.ensure(snippet2, snippet2 && ((anchor) => snippet2(anchor, ...args)));
  }, EFFECT_TRANSPARENT);
}
function onMount(fn) {
  if (component_context === null) {
    lifecycle_outside_component();
  }
  {
    user_effect(() => {
      const cleanup = untrack(fn);
      if (typeof cleanup === "function") return (
        /** @type {() => void} */
        cleanup
      );
    });
  }
}
function if_block(node, fn, elseif = false) {
  if (hydrating) {
    hydrate_next();
  }
  var branches = new BranchManager(node);
  var flags2 = elseif ? EFFECT_TRANSPARENT : 0;
  function update_branch(condition, fn2) {
    if (hydrating) {
      const is_else = read_hydration_instruction(node) === HYDRATION_START_ELSE;
      if (condition === is_else) {
        var anchor = skip_nodes();
        set_hydrate_node(anchor);
        branches.anchor = anchor;
        set_hydrating(false);
        branches.ensure(condition, fn2);
        set_hydrating(true);
        return;
      }
    }
    branches.ensure(condition, fn2);
  }
  block(() => {
    var has_branch = false;
    fn((fn2, flag = true) => {
      has_branch = true;
      update_branch(flag, fn2);
    });
    if (!has_branch) {
      update_branch(false, null);
    }
  }, flags2);
}
function component(node, get_component, render_fn) {
  if (hydrating) {
    hydrate_next();
  }
  var branches = new BranchManager(node);
  block(() => {
    var component2 = get_component() ?? null;
    branches.ensure(component2, component2 && ((target) => render_fn(target, component2)));
  }, EFFECT_TRANSPARENT);
}
function head(hash, render_fn) {
  let previous_hydrate_node = null;
  let was_hydrating = hydrating;
  var anchor;
  if (hydrating) {
    previous_hydrate_node = hydrate_node;
    var head_anchor = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(document.head)
    );
    while (head_anchor !== null && (head_anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */
    head_anchor.data !== hash)) {
      head_anchor = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(head_anchor);
    }
    if (head_anchor === null) {
      set_hydrating(false);
    } else {
      var start = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(head_anchor)
      );
      head_anchor.remove();
      set_hydrate_node(start);
    }
  }
  if (!hydrating) {
    anchor = document.head.appendChild(create_text());
  }
  try {
    block(() => render_fn(anchor), HEAD_EFFECT);
  } finally {
    if (was_hydrating) {
      set_hydrating(true);
      set_hydrate_node(
        /** @type {TemplateNode} */
        previous_hydrate_node
      );
    }
  }
}
function append_styles$1(anchor, css) {
  effect(() => {
    var root2 = anchor.getRootNode();
    var target = (
      /** @type {ShadowRoot} */
      root2.host ? (
        /** @type {ShadowRoot} */
        root2
      ) : (
        /** @type {Document} */
        root2.head ?? /** @type {Document} */
        root2.ownerDocument.head
      )
    );
    if (!target.querySelector("#" + css.hash)) {
      const style = document.createElement("style");
      style.id = css.hash;
      style.textContent = css.code;
      target.appendChild(style);
    }
  });
}
function action(dom, action2, get_value) {
  effect(() => {
    var payload = untrack(() => action2(dom, get_value == null ? void 0 : get_value()) || {});
    if (get_value && (payload == null ? void 0 : payload.update)) {
      var inited = false;
      var prev = (
        /** @type {any} */
        {}
      );
      render_effect(() => {
        var value = get_value();
        deep_read_state(value);
        if (inited && safe_not_equal(prev, value)) {
          prev = value;
          payload.update(value);
        }
      });
      inited = true;
    }
    if (payload == null ? void 0 : payload.destroy) {
      return () => (
        /** @type {Function} */
        payload.destroy()
      );
    }
  });
}
const whitespace = [..." 	\n\r\f \v\uFEFF"];
function to_class(value, hash, directives) {
  var classname = value == null ? "" : "" + value;
  if (hash) {
    classname = classname ? classname + " " + hash : hash;
  }
  if (directives) {
    for (var key in directives) {
      if (directives[key]) {
        classname = classname ? classname + " " + key : key;
      } else if (classname.length) {
        var len = key.length;
        var a = 0;
        while ((a = classname.indexOf(key, a)) >= 0) {
          var b = a + len;
          if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
            classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
          } else {
            a = b;
          }
        }
      }
    }
  }
  return classname === "" ? null : classname;
}
function append_styles(styles, important = false) {
  var separator = important ? " !important;" : ";";
  var css = "";
  for (var key in styles) {
    var value = styles[key];
    if (value != null && value !== "") {
      css += " " + key + ": " + value + separator;
    }
  }
  return css;
}
function to_style(value, styles) {
  if (styles) {
    var new_style = "";
    var normal_styles;
    var important_styles;
    if (Array.isArray(styles)) {
      normal_styles = styles[0];
      important_styles = styles[1];
    } else {
      normal_styles = styles;
    }
    if (normal_styles) {
      new_style += append_styles(normal_styles);
    }
    if (important_styles) {
      new_style += append_styles(important_styles, true);
    }
    new_style = new_style.trim();
    return new_style === "" ? null : new_style;
  }
  return String(value);
}
function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
  var prev = dom.__className;
  if (hydrating || prev !== value || prev === void 0) {
    var next_class_name = to_class(value, hash, next_classes);
    if (!hydrating || next_class_name !== dom.getAttribute("class")) {
      if (next_class_name == null) {
        dom.removeAttribute("class");
      } else {
        dom.className = next_class_name;
      }
    }
    dom.__className = value;
  } else if (next_classes && prev_classes !== next_classes) {
    for (var key in next_classes) {
      var is_present = !!next_classes[key];
      if (prev_classes == null || is_present !== !!prev_classes[key]) {
        dom.classList.toggle(key, is_present);
      }
    }
  }
  return next_classes;
}
function update_styles(dom, prev = {}, next2, priority) {
  for (var key in next2) {
    var value = next2[key];
    if (prev[key] !== value) {
      if (next2[key] == null) {
        dom.style.removeProperty(key);
      } else {
        dom.style.setProperty(key, value, priority);
      }
    }
  }
}
function set_style(dom, value, prev_styles, next_styles) {
  var prev = dom.__style;
  if (hydrating || prev !== value) {
    var next_style_attr = to_style(value, next_styles);
    if (!hydrating || next_style_attr !== dom.getAttribute("style")) {
      if (next_style_attr == null) {
        dom.removeAttribute("style");
      } else {
        dom.style.cssText = next_style_attr;
      }
    }
    dom.__style = value;
  } else if (next_styles) {
    if (Array.isArray(next_styles)) {
      update_styles(dom, prev_styles == null ? void 0 : prev_styles[0], next_styles[0]);
      update_styles(dom, prev_styles == null ? void 0 : prev_styles[1], next_styles[1], "important");
    } else {
      update_styles(dom, prev_styles, next_styles);
    }
  }
  return next_styles;
}
const IS_CUSTOM_ELEMENT = Symbol("is custom element");
const IS_HTML = Symbol("is html");
function set_attribute(element, attribute, value, skip_warning) {
  var attributes = get_attributes(element);
  if (hydrating) {
    attributes[attribute] = element.getAttribute(attribute);
    if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === "LINK") {
      return;
    }
  }
  if (attributes[attribute] === (attributes[attribute] = value)) return;
  if (attribute === "loading") {
    element[LOADING_ATTR_SYMBOL] = value;
  }
  if (value == null) {
    element.removeAttribute(attribute);
  } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
    element[attribute] = value;
  } else {
    element.setAttribute(attribute, value);
  }
}
function get_attributes(element) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    element.__attributes ?? (element.__attributes = {
      [IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
      [IS_HTML]: element.namespaceURI === NAMESPACE_HTML
    })
  );
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(element) {
  var cache_key = element.getAttribute("is") || element.nodeName;
  var setters = setters_cache.get(cache_key);
  if (setters) return setters;
  setters_cache.set(cache_key, setters = []);
  var descriptors;
  var proto = element;
  var element_proto = Element.prototype;
  while (element_proto !== proto) {
    descriptors = get_descriptors(proto);
    for (var key in descriptors) {
      if (descriptors[key].set) {
        setters.push(key);
      }
    }
    proto = get_prototype_of(proto);
  }
  return setters;
}
function is_bound_this(bound_value, element_or_component) {
  return bound_value === element_or_component || (bound_value == null ? void 0 : bound_value[STATE_SYMBOL]) === element_or_component;
}
function bind_this(element_or_component = {}, update, get_value, get_parts) {
  effect(() => {
    var old_parts;
    var parts;
    render_effect(() => {
      old_parts = parts;
      parts = [];
      untrack(() => {
        if (element_or_component !== get_value(...parts)) {
          update(element_or_component, ...parts);
          if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
            update(null, ...old_parts);
          }
        }
      });
    });
    return () => {
      queue_micro_task(() => {
        if (parts && is_bound_this(get_value(...parts), element_or_component)) {
          update(null, ...parts);
        }
      });
    };
  });
  return element_or_component;
}
function subscribe_to_store(store, run, invalidate) {
  if (store == null) {
    run(void 0);
    if (invalidate) invalidate(void 0);
    return noop;
  }
  const unsub = untrack(
    () => store.subscribe(
      run,
      // @ts-expect-error
      invalidate
    )
  );
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set2(fn(
      /** @type {T} */
      value
    ));
  }
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update) || noop;
    }
    run(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update, subscribe };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set2, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set2, update);
      if (auto) {
        set2(result);
      } else {
        cleanup = typeof result === "function" ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i) => subscribe_to_store(
        store,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function get(store) {
  let value;
  subscribe_to_store(store, (_) => value = _)();
  return value;
}
let is_store_binding = false;
let IS_UNMOUNTED = Symbol();
function store_get(store, store_name, stores) {
  const entry = stores[store_name] ?? (stores[store_name] = {
    store: null,
    source: /* @__PURE__ */ mutable_source(void 0),
    unsubscribe: noop
  });
  if (entry.store !== store && !(IS_UNMOUNTED in stores)) {
    entry.unsubscribe();
    entry.store = store ?? null;
    if (store == null) {
      entry.source.v = void 0;
      entry.unsubscribe = noop;
    } else {
      var is_synchronous_callback = true;
      entry.unsubscribe = subscribe_to_store(store, (v) => {
        if (is_synchronous_callback) {
          entry.source.v = v;
        } else {
          set(entry.source, v);
        }
      });
      is_synchronous_callback = false;
    }
  }
  if (store && IS_UNMOUNTED in stores) {
    return get(store);
  }
  return get$1(entry.source);
}
function store_set(store, value) {
  store.set(value);
  return value;
}
function setup_stores() {
  const stores = {};
  function cleanup() {
    teardown(() => {
      for (var store_name in stores) {
        const ref = stores[store_name];
        ref.unsubscribe();
      }
      define_property(stores, IS_UNMOUNTED, {
        enumerable: false,
        value: true
      });
    });
  }
  return [stores, cleanup];
}
function capture_store_binding(fn) {
  var previous_is_store_binding = is_store_binding;
  try {
    is_store_binding = false;
    return [fn(), is_store_binding];
  } finally {
    is_store_binding = previous_is_store_binding;
  }
}
const rest_props_handler = {
  get(target, key) {
    if (target.exclude.includes(key)) return;
    return target.props[key];
  },
  set(target, key) {
    return false;
  },
  getOwnPropertyDescriptor(target, key) {
    if (target.exclude.includes(key)) return;
    if (key in target.props) {
      return {
        enumerable: true,
        configurable: true,
        value: target.props[key]
      };
    }
  },
  has(target, key) {
    if (target.exclude.includes(key)) return false;
    return key in target.props;
  },
  ownKeys(target) {
    return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
  }
};
// @__NO_SIDE_EFFECTS__
function rest_props(props, exclude, name) {
  return new Proxy(
    { props, exclude },
    rest_props_handler
  );
}
const spread_props_handler = {
  get(target, key) {
    let i = target.props.length;
    while (i--) {
      let p = target.props[i];
      if (is_function(p)) p = p();
      if (typeof p === "object" && p !== null && key in p) return p[key];
    }
  },
  set(target, key, value) {
    let i = target.props.length;
    while (i--) {
      let p = target.props[i];
      if (is_function(p)) p = p();
      const desc = get_descriptor(p, key);
      if (desc && desc.set) {
        desc.set(value);
        return true;
      }
    }
    return false;
  },
  getOwnPropertyDescriptor(target, key) {
    let i = target.props.length;
    while (i--) {
      let p = target.props[i];
      if (is_function(p)) p = p();
      if (typeof p === "object" && p !== null && key in p) {
        const descriptor = get_descriptor(p, key);
        if (descriptor && !descriptor.configurable) {
          descriptor.configurable = true;
        }
        return descriptor;
      }
    }
  },
  has(target, key) {
    if (key === STATE_SYMBOL || key === LEGACY_PROPS) return false;
    for (let p of target.props) {
      if (is_function(p)) p = p();
      if (p != null && key in p) return true;
    }
    return false;
  },
  ownKeys(target) {
    const keys = [];
    for (let p of target.props) {
      if (is_function(p)) p = p();
      if (!p) continue;
      for (const key in p) {
        if (!keys.includes(key)) keys.push(key);
      }
      for (const key of Object.getOwnPropertySymbols(p)) {
        if (!keys.includes(key)) keys.push(key);
      }
    }
    return keys;
  }
};
function spread_props(...props) {
  return new Proxy({ props }, spread_props_handler);
}
function prop(props, key, flags2, fallback) {
  var _a2;
  var bindable = (flags2 & PROPS_IS_BINDABLE) !== 0;
  var lazy = (flags2 & PROPS_IS_LAZY_INITIAL) !== 0;
  var fallback_value = (
    /** @type {V} */
    fallback
  );
  var fallback_dirty = true;
  var get_fallback = () => {
    if (fallback_dirty) {
      fallback_dirty = false;
      fallback_value = lazy ? untrack(
        /** @type {() => V} */
        fallback
      ) : (
        /** @type {V} */
        fallback
      );
    }
    return fallback_value;
  };
  var setter;
  if (bindable) {
    var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
    setter = ((_a2 = get_descriptor(props, key)) == null ? void 0 : _a2.set) ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
  }
  var initial_value;
  var is_store_sub = false;
  if (bindable) {
    [initial_value, is_store_sub] = capture_store_binding(() => (
      /** @type {V} */
      props[key]
    ));
  } else {
    initial_value = /** @type {V} */
    props[key];
  }
  if (initial_value === void 0 && fallback !== void 0) {
    initial_value = get_fallback();
    if (setter) {
      props_invalid_value();
      setter(initial_value);
    }
  }
  var getter;
  {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key]
      );
      if (value === void 0) return get_fallback();
      fallback_dirty = true;
      return value;
    };
  }
  if ((flags2 & PROPS_IS_UPDATED) === 0) {
    return getter;
  }
  if (setter) {
    var legacy_parent = props.$$legacy;
    return (
      /** @type {() => V} */
      (function(value, mutation) {
        if (arguments.length > 0) {
          if (!mutation || legacy_parent || is_store_sub) {
            setter(mutation ? getter() : value);
          }
          return value;
        }
        return getter();
      })
    );
  }
  var overridden = false;
  var d = ((flags2 & PROPS_IS_IMMUTABLE) !== 0 ? derived$1 : derived_safe_equal)(() => {
    overridden = false;
    return getter();
  });
  if (bindable) get$1(d);
  var parent_effect = (
    /** @type {Effect} */
    active_effect
  );
  return (
    /** @type {() => V} */
    (function(value, mutation) {
      if (arguments.length > 0) {
        const new_value = mutation ? get$1(d) : bindable ? proxy(value) : value;
        set(d, new_value);
        overridden = true;
        if (fallback_value !== void 0) {
          fallback_value = new_value;
        }
        return value;
      }
      if (is_destroying_effect && overridden || (parent_effect.f & DESTROYED) !== 0) {
        return d.v;
      }
      return get$1(d);
    })
  );
}
function createClassComponent(options) {
  return new Svelte4Component(options);
}
class Svelte4Component {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(options) {
    /** @type {any} */
    __privateAdd(this, _events);
    /** @type {Record<string, any>} */
    __privateAdd(this, _instance);
    var _a2;
    var sources = /* @__PURE__ */ new Map();
    var add_source = (key, value) => {
      var s = /* @__PURE__ */ mutable_source(value, false, false);
      sources.set(key, s);
      return s;
    };
    const props = new Proxy(
      { ...options.props || {}, $$events: {} },
      {
        get(target, prop2) {
          return get$1(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
        },
        has(target, prop2) {
          if (prop2 === LEGACY_PROPS) return true;
          get$1(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
          return Reflect.has(target, prop2);
        },
        set(target, prop2, value) {
          set(sources.get(prop2) ?? add_source(prop2, value), value);
          return Reflect.set(target, prop2, value);
        }
      }
    );
    __privateSet(this, _instance, (options.hydrate ? hydrate : mount)(options.component, {
      target: options.target,
      anchor: options.anchor,
      props,
      context: options.context,
      intro: options.intro ?? false,
      recover: options.recover
    }));
    if (!((_a2 = options == null ? void 0 : options.props) == null ? void 0 : _a2.$$host) || options.sync === false) {
      flushSync();
    }
    __privateSet(this, _events, props.$$events);
    for (const key of Object.keys(__privateGet(this, _instance))) {
      if (key === "$set" || key === "$destroy" || key === "$on") continue;
      define_property(this, key, {
        get() {
          return __privateGet(this, _instance)[key];
        },
        /** @param {any} value */
        set(value) {
          __privateGet(this, _instance)[key] = value;
        },
        enumerable: true
      });
    }
    __privateGet(this, _instance).$set = /** @param {Record<string, any>} next */
    (next2) => {
      Object.assign(props, next2);
    };
    __privateGet(this, _instance).$destroy = () => {
      unmount(__privateGet(this, _instance));
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    __privateGet(this, _instance).$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event2, callback) {
    __privateGet(this, _events)[event2] = __privateGet(this, _events)[event2] || [];
    const cb = (...args) => callback.call(this, ...args);
    __privateGet(this, _events)[event2].push(cb);
    return () => {
      __privateGet(this, _events)[event2] = __privateGet(this, _events)[event2].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    __privateGet(this, _instance).$destroy();
  }
}
_events = new WeakMap();
_instance = new WeakMap();
let SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    /**
     * @param {*} $$componentCtor
     * @param {*} $$slots
     * @param {*} use_shadow_dom
     */
    constructor($$componentCtor, $$slots, use_shadow_dom) {
      super();
      /** The Svelte component constructor */
      __publicField(this, "$$ctor");
      /** Slots */
      __publicField(this, "$$s");
      /** @type {any} The Svelte component instance */
      __publicField(this, "$$c");
      /** Whether or not the custom element is connected */
      __publicField(this, "$$cn", false);
      /** @type {Record<string, any>} Component props data */
      __publicField(this, "$$d", {});
      /** `true` if currently in the process of reflecting component props back to attributes */
      __publicField(this, "$$r", false);
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      __publicField(this, "$$p_d", {});
      /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
      __publicField(this, "$$l", {});
      /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
      __publicField(this, "$$l_u", /* @__PURE__ */ new Map());
      /** @type {any} The managed render effect for reflecting attributes */
      __publicField(this, "$$me");
      this.$$ctor = $$componentCtor;
      this.$$s = $$slots;
      if (use_shadow_dom) {
        this.attachShadow({ mode: "open" });
      }
    }
    /**
     * @param {string} type
     * @param {EventListenerOrEventListenerObject} listener
     * @param {boolean | AddEventListenerOptions} [options]
     */
    addEventListener(type, listener, options) {
      this.$$l[type] = this.$$l[type] || [];
      this.$$l[type].push(listener);
      if (this.$$c) {
        const unsub = this.$$c.$on(type, listener);
        this.$$l_u.set(listener, unsub);
      }
      super.addEventListener(type, listener, options);
    }
    /**
     * @param {string} type
     * @param {EventListenerOrEventListenerObject} listener
     * @param {boolean | AddEventListenerOptions} [options]
     */
    removeEventListener(type, listener, options) {
      super.removeEventListener(type, listener, options);
      if (this.$$c) {
        const unsub = this.$$l_u.get(listener);
        if (unsub) {
          unsub();
          this.$$l_u.delete(listener);
        }
      }
    }
    async connectedCallback() {
      this.$$cn = true;
      if (!this.$$c) {
        let create_slot = function(name) {
          return (anchor) => {
            const slot = document.createElement("slot");
            if (name !== "default") slot.name = name;
            append(anchor, slot);
          };
        };
        await Promise.resolve();
        if (!this.$$cn || this.$$c) {
          return;
        }
        const $$slots = {};
        const existing_slots = get_custom_elements_slots(this);
        for (const name of this.$$s) {
          if (name in existing_slots) {
            if (name === "default" && !this.$$d.children) {
              this.$$d.children = create_slot(name);
              $$slots.default = true;
            } else {
              $$slots[name] = create_slot(name);
            }
          }
        }
        for (const attribute of this.attributes) {
          const name = this.$$g_p(attribute.name);
          if (!(name in this.$$d)) {
            this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
          }
        }
        for (const key in this.$$p_d) {
          if (!(key in this.$$d) && this[key] !== void 0) {
            this.$$d[key] = this[key];
            delete this[key];
          }
        }
        this.$$c = createClassComponent({
          component: this.$$ctor,
          target: this.shadowRoot || this,
          props: {
            ...this.$$d,
            $$slots,
            $$host: this
          }
        });
        this.$$me = effect_root(() => {
          render_effect(() => {
            var _a2;
            this.$$r = true;
            for (const key of object_keys(this.$$c)) {
              if (!((_a2 = this.$$p_d[key]) == null ? void 0 : _a2.reflect)) continue;
              this.$$d[key] = this.$$c[key];
              const attribute_value = get_custom_element_value(
                key,
                this.$$d[key],
                this.$$p_d,
                "toAttribute"
              );
              if (attribute_value == null) {
                this.removeAttribute(this.$$p_d[key].attribute || key);
              } else {
                this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
              }
            }
            this.$$r = false;
          });
        });
        for (const type in this.$$l) {
          for (const listener of this.$$l[type]) {
            const unsub = this.$$c.$on(type, listener);
            this.$$l_u.set(listener, unsub);
          }
        }
        this.$$l = {};
      }
    }
    // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
    // and setting attributes through setAttribute etc, this is helpful
    /**
     * @param {string} attr
     * @param {string} _oldValue
     * @param {string} newValue
     */
    attributeChangedCallback(attr, _oldValue, newValue) {
      var _a2;
      if (this.$$r) return;
      attr = this.$$g_p(attr);
      this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, "toProp");
      (_a2 = this.$$c) == null ? void 0 : _a2.$set({ [attr]: this.$$d[attr] });
    }
    disconnectedCallback() {
      this.$$cn = false;
      Promise.resolve().then(() => {
        if (!this.$$cn && this.$$c) {
          this.$$c.$destroy();
          this.$$me();
          this.$$c = void 0;
        }
      });
    }
    /**
     * @param {string} attribute_name
     */
    $$g_p(attribute_name) {
      return object_keys(this.$$p_d).find(
        (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
      ) || attribute_name;
    }
  };
}
function get_custom_element_value(prop2, value, props_definition, transform) {
  var _a2;
  const type = (_a2 = props_definition[prop2]) == null ? void 0 : _a2.type;
  value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
  if (!transform || !props_definition[prop2]) {
    return value;
  } else if (transform === "toAttribute") {
    switch (type) {
      case "Object":
      case "Array":
        return value == null ? null : JSON.stringify(value);
      case "Boolean":
        return value ? "" : null;
      case "Number":
        return value == null ? null : value;
      default:
        return value;
    }
  } else {
    switch (type) {
      case "Object":
      case "Array":
        return value && JSON.parse(value);
      case "Boolean":
        return value;
      // conversion already handled above
      case "Number":
        return value != null ? +value : value;
      default:
        return value;
    }
  }
}
function get_custom_elements_slots(element) {
  const result = {};
  element.childNodes.forEach((node) => {
    result[
      /** @type {Element} node */
      node.slot || "default"
    ] = true;
  });
  return result;
}
function create_custom_element(Component, props_definition, slots, exports$1, use_shadow_dom, extend) {
  let Class = class extends SvelteElement {
    constructor() {
      super(Component, slots, use_shadow_dom);
      this.$$p_d = props_definition;
    }
    static get observedAttributes() {
      return object_keys(props_definition).map(
        (key) => (props_definition[key].attribute || key).toLowerCase()
      );
    }
  };
  object_keys(props_definition).forEach((prop2) => {
    define_property(Class.prototype, prop2, {
      get() {
        return this.$$c && prop2 in this.$$c ? this.$$c[prop2] : this.$$d[prop2];
      },
      set(value) {
        var _a2;
        value = get_custom_element_value(prop2, value, props_definition);
        this.$$d[prop2] = value;
        var component2 = this.$$c;
        if (component2) {
          var setter = (_a2 = get_descriptor(component2, prop2)) == null ? void 0 : _a2.get;
          if (setter) {
            component2[prop2] = value;
          } else {
            component2.$set({ [prop2]: value });
          }
        }
      }
    });
  });
  exports$1.forEach((property) => {
    define_property(Class.prototype, property, {
      get() {
        var _a2;
        return (_a2 = this.$$c) == null ? void 0 : _a2[property];
      }
    });
  });
  Component.element = /** @type {any} */
  Class;
  return Class;
}
const getScrollSpeed = (callback) => {
  const getScrollTop = () => document.documentElement.scrollTop;
  let lastOffset = getScrollTop();
  let lastDate = Date.now();
  const onScroll = () => {
    const delayInMs = Date.now() - lastDate;
    const offset = getScrollTop() - lastOffset;
    const speedInpxPerMs = offset / delayInMs;
    const scrollSpeed = Math.abs(speedInpxPerMs);
    lastDate = Date.now();
    lastOffset = getScrollTop();
    callback(scrollSpeed);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  const onEndScroll = () => callback(0);
  window.addEventListener("scrollend", onEndScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("scrollend", onEndScroll);
  };
};
const retryUntil = (condition) => new Promise(
  (resolve) => condition() ? resolve(0) : setInterval(() => condition() && resolve(0), 10)
);
function OnProgressHandler($$anchor, $$props) {
  push($$props, true);
  let onProgress = prop($$props, "onProgress", 7), scrollytellerRef = prop($$props, "scrollytellerRef", 7);
  const scrollHandler = () => {
    const rootRect = scrollytellerRef().getBoundingClientRect();
    onProgress()("progress", {
      boundingRect: rootRect,
      rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
      scrollPct: 1 - (rootRect.bottom - window.innerHeight) / (rootRect.height - window.innerHeight)
    });
  };
  var $$exports = {
    get onProgress() {
      return onProgress();
    },
    set onProgress($$value) {
      onProgress($$value);
      flushSync();
    },
    get scrollytellerRef() {
      return scrollytellerRef();
    },
    set scrollytellerRef($$value) {
      scrollytellerRef($$value);
      flushSync();
    }
  };
  event("scroll", $window, scrollHandler);
  return pop($$exports);
}
create_custom_element(OnProgressHandler, { onProgress: {}, scrollytellerRef: {} }, [], [], true);
function PanelObserver($$anchor, $$props) {
  push($$props, true);
  const $isMobileRowMode = () => store_get(isMobileRowMode, "$isMobileRowMode", $$stores);
  const $vizDims = () => store_get(vizDims, "$vizDims", $$stores);
  const $screenDims = () => store_get(screenDims, "$screenDims", $$stores);
  const $isSplitScreen = () => store_get(isSplitScreen, "$isSplitScreen", $$stores);
  const $steps = () => store_get(steps, "$steps", $$stores);
  const [$$stores, $$cleanup] = setup_stores();
  const vizDims = getContext("vizDims");
  const isSplitScreen = getContext("isSplitScreen");
  const isMobileRowMode = getContext("isMobileRowMode");
  const screenDims = getContext("screenDims");
  const steps = getContext("steps");
  const currentPanel = getContext("currentPanel");
  let marker = prop($$props, "marker", 15), observerOptions = prop($$props, "observerOptions", 7), vizMarkerThreshold = prop($$props, "vizMarkerThreshold", 7, 20);
  let vizMarkerThresholdMarginDecimal = /* @__PURE__ */ user_derived(() => (100 - vizMarkerThreshold() * 2) / 100);
  let rootMargin = /* @__PURE__ */ user_derived(() => {
    if ($isMobileRowMode()) {
      const threshold = $vizDims().dims[1] / $screenDims()[1] * 100;
      return `-${threshold}% 0px -30% 0px`;
    } else if ($isSplitScreen()) {
      const threshold = Math.round(($screenDims()[1] - ($vizDims().dims[1] || $screenDims()[1]) * get$1(vizMarkerThresholdMarginDecimal)) / 2);
      return `-${threshold}px 0px -${threshold}px 0px`;
    } else {
      const threshold = Math.round($screenDims()[1] / 8);
      return `-${threshold}px 0px -${threshold}px 0px`;
    }
  });
  let _observerOptions = /* @__PURE__ */ user_derived(() => ({ ...observerOptions() || {}, rootMargin: get$1(rootMargin) }));
  let intersectingPanels = /* @__PURE__ */ state(proxy([]));
  user_effect(() => {
    if ($vizDims().status !== "ready" || !$steps().length) {
      return;
    }
    set(intersectingPanels, [], true);
    const panelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            set(intersectingPanels, [...get$1(intersectingPanels), entry], true);
          } else {
            set(intersectingPanels, get$1(intersectingPanels).filter((panel) => panel.target !== entry.target), true);
          }
          const newPanel = get$1(intersectingPanels)[get$1(intersectingPanels).length - 1];
          if (newPanel) {
            marker(newPanel.target.scrollyData);
            store_set(currentPanel, $steps().findIndex((step) => step === newPanel.target));
          }
        });
      },
      get$1(_observerOptions)
    );
    $steps().forEach((step) => {
      panelObserver.observe(step);
    });
    return () => {
      panelObserver == null ? void 0 : panelObserver.disconnect();
    };
  });
  var $$exports = {
    get marker() {
      return marker();
    },
    set marker($$value) {
      marker($$value);
      flushSync();
    },
    get observerOptions() {
      return observerOptions();
    },
    set observerOptions($$value) {
      observerOptions($$value);
      flushSync();
    },
    get vizMarkerThreshold() {
      return vizMarkerThreshold();
    },
    set vizMarkerThreshold($$value = 20) {
      vizMarkerThreshold($$value);
      flushSync();
    }
  };
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(PanelObserver, { marker: {}, observerOptions: {}, vizMarkerThreshold: {} }, [], [], true);
function ScreenDimsStoreUpdater($$anchor, $$props) {
  push($$props, true);
  const [$$stores, $$cleanup] = setup_stores();
  const globalAlign = getContext("globalAlign");
  const screenDims = getContext("screenDims");
  const globalMobileVariant = getContext("mobileVariant");
  let align = prop($$props, "align", 7, "centre"), mobileVariant = prop($$props, "mobileVariant", 7, "blocks");
  user_effect(() => {
    store_set(globalAlign, align());
  });
  user_effect(() => {
    store_set(globalMobileVariant, mobileVariant());
  });
  onMount(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        requestAnimationFrame(() => {
          store_set(screenDims, [width, height]);
        });
      }
    });
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  });
  var $$exports = {
    get align() {
      return align();
    },
    set align($$value = "centre") {
      align($$value);
      flushSync();
    },
    get mobileVariant() {
      return mobileVariant();
    },
    set mobileVariant($$value = "blocks") {
      mobileVariant($$value);
      flushSync();
    }
  };
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(ScreenDimsStoreUpdater, { align: {}, mobileVariant: {} }, [], [], true);
function setSteps() {
  return writable([]);
}
function setMargin() {
  return writable(0);
}
function setVizDims() {
  return writable({
    status: "loading",
    dims: [0, 0]
  });
}
function setGraphicRootDims() {
  return writable({
    status: "loading",
    dims: [0, 0]
  });
}
function setRatio() {
  return writable(1);
}
function setScreenDims() {
  return writable([0, 0]);
}
function setGlobalAlign() {
  return writable("centre");
}
function setMobileVariant() {
  return writable("blocks");
}
const LARGE_TABLET_BREAKPOINT = 992;
function setIsSplitScreen([screenDims, globalAlign]) {
  return derived(
    [screenDims, globalAlign],
    ([$screenDims, $globalAlign]) => ["left", "right"].includes($globalAlign) && $screenDims[0] >= LARGE_TABLET_BREAKPOINT
  );
}
function setIsMobileRowMode([screenDims, mobileVariant]) {
  return derived(
    [screenDims, mobileVariant],
    ([$screenDims, $mobileVariant]) => $mobileVariant === "rows" && $screenDims[0] < LARGE_TABLET_BREAKPOINT
  );
}
function setMaxScrollytellerWidth([isSplitScreen]) {
  return derived(
    [isSplitScreen],
    ([$isSplitScreen]) => $isSplitScreen ? 2040 : 1e6
  );
}
function setMaxGraphicWidth([
  isSplitScreen,
  graphicRootDims,
  screenDims,
  ratio,
  maxScrollytellerWidth
]) {
  return derived(
    [isSplitScreen, graphicRootDims, screenDims, ratio, maxScrollytellerWidth],
    ([
      $isSplitScreen,
      $graphicRootDims,
      $screenDims,
      $ratio,
      $maxScrollytellerWidth
    ]) => {
      if (!$isSplitScreen) {
        return 1e6;
      }
      const [screenWidth] = $screenDims;
      const [, columnHeight] = $graphicRootDims.dims;
      const columnWidth = Math.min(screenWidth, $maxScrollytellerWidth) * 0.6;
      const widthBasedOnHeight = columnHeight * $ratio;
      return Math.min(widthBasedOnHeight, columnWidth);
    }
  );
}
function setCurrentPanel() {
  return writable(0);
}
const children = (el, children2) => {
  children2.forEach((node) => el.appendChild(node));
  return {
    destroy() {
      children2.forEach((node) => el.removeChild(node));
    }
  };
};
var root$2 = /* @__PURE__ */ from_html(`<div><div class="st-panel svelte-f3p84p"></div></div>`);
const $$css$3 = {
  hash: "svelte-f3p84p",
  code: '@media (max-width: 62rem) {.scrollyteller--mobile-row-variant .st-panel.svelte-f3p84p::before {opacity:0 !important;}.scrollyteller--mobile-row-variant .st-panel-root.svelte-f3p84p {margin:40vh auto;}\n}.st-panel-root.svelte-f3p84p {--panel-radius: 0.75rem;--panel-background: var(\n    --color-panel-background,\n    rgba(255, 255, 255, 0.95)\n  );--panel-color: var(--color-panel-text, #000);--panel-opacity: var(--color-panel-opacity, 1);--panel-filter: var(--color-panel-filter, blur(2.5px));--panel-border: var(--color-panel-border, 1px solid rgba(0, 0, 0, 0.15));--panel-padding: 1rem;\n  /* How opaque do we make inactive panels on 2 column mode */--panel-opacity-inactive: var(--color-panel-opacity-inactive, 1);\n  /** How much margin should we have between panels on 2 column mode */--panel-column-margin: var(--color-panel-margin, 40vh);box-sizing:border-box;margin:80vh auto;position:relative;z-index:1;pointer-events:none;}\n@media (min-width: 46.5rem) {.st-panel-root.svelte-f3p84p {--panel-padding: 2rem;}\n}.scrollyteller--debug .st-panel-root.svelte-f3p84p {outline:5px solid limegreen;}.st-panel-root.first.svelte-f3p84p {margin-top:100dvh;}.st-panel-root.last.svelte-f3p84p {margin-bottom:50vh;}\n@media (min-width: 62rem) {.st-panel-root--left.svelte-f3p84p, .st-panel-root--right.svelte-f3p84p {margin-top:var(--panel-column-margin);margin-bottom:var(--panel-column-margin);opacity:1;}.st-panel-root--left.st-panel-root--transparent-blocks.st-panel-root--active.svelte-f3p84p, .st-panel-root--right.st-panel-root--transparent-blocks.st-panel-root--active.svelte-f3p84p {opacity:1;}.st-panel-root--left.st-panel-root--transparent-blocks.svelte-f3p84p, .st-panel-root--right.st-panel-root--transparent-blocks.svelte-f3p84p {--panel-filter: none;--panel-background: none;--panel-border: none;--panel-padding: 0;opacity:var(--panel-opacity-inactive);}.st-panel-root--left.first.svelte-f3p84p, .st-panel-root--right.first.svelte-f3p84p {margin-top:50dvh;}\n}.st-panel.svelte-f3p84p {-webkit-backdrop-filter:var(--panel-filter);backdrop-filter:var(--panel-filter);color:var(--panel-color);border-radius:var(--panel-radius);padding:var(--panel-padding);max-width:640px;margin:auto;}.st-panel.svelte-f3p84p::before {content:"";background-color:var(--panel-background);opacity:var(--panel-opacity);border-radius:var(--panel-radius);border:var(--panel-border);position:absolute;z-index:-1;top:0;left:0;width:100%;height:100%;}.st-panel.svelte-f3p84p::after {content:"";display:table;clear:both;}.st-panel.svelte-f3p84p > * {pointer-events:all;color:var(--panel-color);margin-top:0;margin-left:auto !important;margin-right:auto !important;}.st-panel.svelte-f3p84p > *:last-child {margin-bottom:0;}.st-panel.svelte-f3p84p > :is(div, p) {font-family:ABCSans, sans-serif;font-size:inherit;line-height:1.666666667;}.st-panel.svelte-f3p84p > img {max-width:66%;display:block;margin:auto;height:auto;}.st-panel.svelte-f3p84p > :is(h1, h2, h3, h4) {font-family:var(--od-font-stack-serif);}'
};
function Panel($$anchor, $$props) {
  push($$props, true);
  append_styles$1($$anchor, $$css$3);
  const $steps = () => store_get(steps, "$steps", $$stores);
  const $currentPanel = () => store_get(currentPanel, "$currentPanel", $$stores);
  const [$$stores, $$cleanup] = setup_stores();
  const currentPanel = getContext("currentPanel");
  const steps = getContext("steps");
  let align = prop($$props, "align", 7), transparentFloat = prop($$props, "transparentFloat", 7), panelClass = prop($$props, "panelClass", 7), data = prop($$props, "data", 7), nodes = prop($$props, "nodes", 7), i = prop($$props, "i", 23, () => -1);
  let panelRef = /* @__PURE__ */ state(void 0);
  onMount(() => {
    get$1(panelRef).scrollyData = data();
    store_set(steps, [...$steps(), get$1(panelRef)]);
  });
  var $$exports = {
    get align() {
      return align();
    },
    set align($$value) {
      align($$value);
      flushSync();
    },
    get transparentFloat() {
      return transparentFloat();
    },
    set transparentFloat($$value) {
      transparentFloat($$value);
      flushSync();
    },
    get panelClass() {
      return panelClass();
    },
    set panelClass($$value) {
      panelClass($$value);
      flushSync();
    },
    get data() {
      return data();
    },
    set data($$value) {
      data($$value);
      flushSync();
    },
    get nodes() {
      return nodes();
    },
    set nodes($$value) {
      nodes($$value);
      flushSync();
    },
    get i() {
      return i();
    },
    set i($$value = -1) {
      i($$value);
      flushSync();
    }
  };
  var div = root$2();
  let classes;
  var div_1 = child(div);
  action(div_1, ($$node, $$action_arg) => children == null ? void 0 : children($$node, $$action_arg), nodes);
  reset(div);
  bind_this(div, ($$value) => set(panelRef, $$value), () => get$1(panelRef));
  template_effect(() => {
    set_attribute(div, "data-align", align());
    set_attribute(div, "data-index", i());
    classes = set_class(div, 1, `st-panel-root ${panelClass() || ""}`, "svelte-f3p84p", classes, {
      "st-panel-root--left": align() === "left",
      "st-panel-root--right": align() === "right",
      "st-panel-root--centre": align() === "centre",
      "st-panel-root--transparent-blocks": transparentFloat(),
      "st-panel-root--active": i() === $currentPanel()
    });
  });
  append($$anchor, div);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(
  Panel,
  {
    align: {},
    transparentFloat: {},
    panelClass: {},
    data: {},
    nodes: {},
    i: {}
  },
  [],
  [],
  true
);
var root_1 = /* @__PURE__ */ from_html(`<div class="panel-wrapper"><div></div></div>`);
const $$css$2 = {
  hash: "svelte-cmbn9g",
  code: ".content.svelte-cmbn9g {margin:-100dvh auto 0;padding-bottom:1px;position:relative;z-index:2;pointer-events:none;font-size:1.125rem;}\n\n@media (min-width: 62rem) {.content--centre.svelte-cmbn9g {max-width:48.75rem;}\n}\n@media (min-width: 90rem) {.content--centre.svelte-cmbn9g {max-width:56.25rem;}\n}.content--left.svelte-cmbn9g, .content--right.svelte-cmbn9g {max-width:127.5rem;margin-left:0;}\n@media (min-width: 62rem) {.content--left.svelte-cmbn9g, .content--right.svelte-cmbn9g {max-width:40rem;margin-right:calc(var(--rightColumnWidth, 100px) + var(--marginOuter) * 1);font-size:1.125rem;}\n}\n@media (min-width: 75rem) {.content--left.svelte-cmbn9g, .content--right.svelte-cmbn9g {font-size:1.125rem;}\n}\n@media (min-width: 90rem) {.content--left.svelte-cmbn9g, .content--right.svelte-cmbn9g {max-width:45rem;font-size:1.25rem;}\n}.content--right.svelte-cmbn9g {margin-right:0;margin-left:calc(var(--rightColumnWidth, 100px) + var(--marginOuter) * 1);}"
};
function Panels($$anchor, $$props) {
  push($$props, true);
  append_styles$1($$anchor, $$css$2);
  let panelRoot = prop($$props, "panelRoot", 15), layout = prop($$props, "layout", 7), panels = prop($$props, "panels", 7), customPanel = prop($$props, "customPanel", 7, null), steps = prop($$props, "steps", 23, () => []);
  let panelGroups = /* @__PURE__ */ user_derived(() => {
    const newPanelGroups = [];
    let group;
    panels().forEach(({ align = layout().align, panelClass = "", ...panel }, i) => {
      if (align !== (group == null ? void 0 : group.align)) {
        group && newPanelGroups.push(group);
        group = { align, panels: [] };
      }
      if (i === 0) panelClass += " first";
      if (i === panels().length - 1) panelClass += " last";
      group.panels.push({ ...panel, panelClass, i });
    });
    newPanelGroups.push(group);
    return newPanelGroups;
  });
  var $$exports = {
    get panelRoot() {
      return panelRoot();
    },
    set panelRoot($$value) {
      panelRoot($$value);
      flushSync();
    },
    get layout() {
      return layout();
    },
    set layout($$value) {
      layout($$value);
      flushSync();
    },
    get panels() {
      return panels();
    },
    set panels($$value) {
      panels($$value);
      flushSync();
    },
    get customPanel() {
      return customPanel();
    },
    set customPanel($$value = null) {
      customPanel($$value);
      flushSync();
    },
    get steps() {
      return steps();
    },
    set steps($$value = []) {
      steps($$value);
      flushSync();
    }
  };
  var fragment = comment();
  var node = first_child(fragment);
  each(node, 17, () => get$1(panelGroups), index, ($$anchor2, group) => {
    var div = root_1();
    var div_1 = child(div);
    let classes;
    each(div_1, 21, () => get$1(group).panels, index, ($$anchor3, panel) => {
      var fragment_1 = comment();
      var node_1 = first_child(fragment_1);
      {
        var consequent = ($$anchor4) => {
          const SvelteComponent = /* @__PURE__ */ user_derived(customPanel);
          var fragment_2 = comment();
          var node_2 = first_child(fragment_2);
          component(node_2, () => get$1(SvelteComponent), ($$anchor5, SvelteComponent_1) => {
            SvelteComponent_1($$anchor5, spread_props(() => get$1(panel), {
              get steps() {
                return steps();
              }
            }));
          });
          append($$anchor4, fragment_2);
        };
        var alternate = ($$anchor4) => {
          {
            let $0 = /* @__PURE__ */ user_derived(() => get$1(panel).align || layout().align);
            Panel($$anchor4, spread_props(() => get$1(panel), {
              get align() {
                return get$1($0);
              },
              get transparentFloat() {
                return layout().transparentFloat;
              },
              get steps() {
                return steps();
              }
            }));
          }
        };
        if_block(node_1, ($$render) => {
          if (customPanel()) $$render(consequent);
          else $$render(alternate, false);
        });
      }
      append($$anchor3, fragment_1);
    });
    reset(div_1);
    reset(div);
    bind_this(div, ($$value) => panelRoot($$value), () => panelRoot());
    template_effect(() => classes = set_class(div_1, 1, "content svelte-cmbn9g", null, classes, {
      "content--centre": get$1(group).align === "centre",
      "content--right": get$1(group).align === "right",
      "content--left": get$1(group).align === "left"
    }));
    append($$anchor2, div);
  });
  append($$anchor, fragment);
  return pop($$exports);
}
create_custom_element(
  Panels,
  {
    panelRoot: {},
    layout: {},
    panels: {},
    customPanel: {},
    steps: {}
  },
  [],
  [],
  true
);
function GraphicObserver($$anchor, $$props) {
  push($$props, true);
  const [$$stores, $$cleanup] = setup_stores();
  let graphicRootEl = prop($$props, "graphicRootEl", 7);
  const vizDims = getContext("vizDims");
  const graphicRootDims = getContext("graphicRootDims");
  onMount(() => {
    let observer;
    observer = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          if (entry.target === graphicRootEl()) {
            store_set(graphicRootDims, {
              status: "ready",
              dims: [entry.contentRect.width, entry.contentRect.height]
            });
          } else {
            store_set(vizDims, {
              status: "ready",
              dims: [entry.contentRect.width, entry.contentRect.height]
            });
          }
        });
      });
    });
    retryUntil(() => graphicRootEl()).then(() => {
      observer.observe(graphicRootEl());
    });
    retryUntil(() => {
      var _a2, _b;
      return (_b = (_a2 = graphicRootEl()) == null ? void 0 : _a2.children) == null ? void 0 : _b.length;
    }).then(() => {
      const child2 = graphicRootEl().children[0];
      observer.observe(child2);
    });
    return () => {
      observer == null ? void 0 : observer.disconnect();
    };
  });
  var $$exports = {
    get graphicRootEl() {
      return graphicRootEl();
    },
    set graphicRootEl($$value) {
      graphicRootEl($$value);
      flushSync();
    }
  };
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(GraphicObserver, { graphicRootEl: {} }, [], [], true);
var root$1 = /* @__PURE__ */ from_html(`<!> <div><!></div>`, 1);
const $$css$1 = {
  hash: "svelte-1q8x2h0",
  code: ".scrollyteller--mobile-row-variant {--marginOuter: 0;--vizMarginOuter: 0;}\n@media (max-width: 62rem) {.scrollyteller--mobile-row-variant .viz--resized.svelte-1q8x2h0 {z-index:10;top:0;margin:0;background:white;width:100% !important;max-height:calc(45vh + 50px);aspect-ratio:1;container-type:normal;padding-bottom:40px;background:linear-gradient(to bottom, white 90%, transparent 100%);}\n}.viz.svelte-1q8x2h0 {transform:translate3d(0, 0, 0);height:100dvh;position:sticky;top:0;left:0;z-index:1;}.viz--resized.svelte-1q8x2h0 {container-type:size;height:60dvh;top:10dvh;display:flex;justify-content:center;align-items:flex-start;margin:0 auto;margin:0 auto;width:calc(100% - var(--marginOuter) * 2);max-width:calc(100vw - var(--vizMarginOuter) * 2);}\n@media (min-width: 46.5rem) {.viz--resized.svelte-1q8x2h0 {--margin: 4rem;top:8dvh;height:62dvh;}\n}.viz--resized.viz--left.svelte-1q8x2h0, .viz--resized.viz--right.svelte-1q8x2h0 {width:var(--rightColumnWidth);}\n@media (min-width: 62rem) {.viz--resized.viz--left.svelte-1q8x2h0, .viz--resized.viz--right.svelte-1q8x2h0 {align-items:center;height:84dvh;top:8dvh;}\n}\n@media (min-width: 75rem) {.viz--resized.viz--left.svelte-1q8x2h0, .viz--resized.viz--right.svelte-1q8x2h0 {height:76dvh;top:12dvh;}\n}\n@media (min-width: 90rem) {.viz--resized.viz--left.svelte-1q8x2h0, .viz--resized.viz--right.svelte-1q8x2h0 {top:10dvh;height:80dvh;}\n}\n@media (min-width: 62rem) {.viz--resized.viz--left.svelte-1q8x2h0 {margin:0 auto 0 0;}\n}\n@media (min-width: 62rem) {.viz--resized.viz--right.svelte-1q8x2h0 {margin:0 0 0 auto;}\n}\n@media (min-width: 62rem) {.viz--resized.viz--centre.svelte-1q8x2h0 {top:8dvh;height:62dvh;}\n}\n@media (min-width: 75rem) {.viz--resized.viz--centre.svelte-1q8x2h0 {top:12dvh;height:58dvh;}\n}\n@media (min-width: 90rem) {.viz--resized.viz--centre.svelte-1q8x2h0 {top:12dvh;height:58dvh;}\n}.scrollyteller--debug .viz--resized.svelte-1q8x2h0 {outline:5px solid limegreen;}"
};
function Viz($$anchor, $$props) {
  push($$props, true);
  append_styles$1($$anchor, $$css$1);
  let layout = prop($$props, "layout", 7), discardSlot = prop($$props, "discardSlot", 7, false), isInViewport = prop($$props, "isInViewport", 7, false), onLoad = prop($$props, "onLoad", 7, () => {
  }), children2 = prop($$props, "children", 7);
  let graphicRootEl = /* @__PURE__ */ state(void 0);
  user_effect(() => {
    if (get$1(graphicRootEl)) {
      onLoad()(get$1(graphicRootEl));
    }
  });
  var $$exports = {
    get layout() {
      return layout();
    },
    set layout($$value) {
      layout($$value);
      flushSync();
    },
    get discardSlot() {
      return discardSlot();
    },
    set discardSlot($$value = false) {
      discardSlot($$value);
      flushSync();
    },
    get isInViewport() {
      return isInViewport();
    },
    set isInViewport($$value = false) {
      isInViewport($$value);
      flushSync();
    },
    get onLoad() {
      return onLoad();
    },
    set onLoad($$value = () => {
    }) {
      onLoad($$value);
      flushSync();
    },
    get children() {
      return children2();
    },
    set children($$value) {
      children2($$value);
      flushSync();
    }
  };
  var fragment = root$1();
  var node = first_child(fragment);
  GraphicObserver(node, {
    get graphicRootEl() {
      return get$1(graphicRootEl);
    }
  });
  var div = sibling(node, 2);
  let classes;
  var node_1 = child(div);
  {
    var consequent = ($$anchor2) => {
      var fragment_1 = comment();
      var node_2 = first_child(fragment_1);
      snippet(node_2, () => children2() ?? noop);
      append($$anchor2, fragment_1);
    };
    if_block(node_1, ($$render) => {
      if (isInViewport() || discardSlot() === false) $$render(consequent);
    });
  }
  reset(div);
  bind_this(div, ($$value) => set(graphicRootEl, $$value), () => get$1(graphicRootEl));
  template_effect(() => classes = set_class(div, 1, "viz svelte-1q8x2h0", null, classes, {
    "viz--resized": layout().resizeInteractive,
    "viz--right": layout().resizeInteractive && layout().align === "left",
    "viz--left": layout().resizeInteractive && layout().align === "right",
    "viz--centre": layout().resizeInteractive && layout().align === "centre"
  }));
  append($$anchor, fragment);
  return pop($$exports);
}
create_custom_element(
  Viz,
  {
    layout: {},
    discardSlot: {},
    isInViewport: {},
    onLoad: {},
    children: {}
  },
  [],
  [],
  true
);
var root_2 = /* @__PURE__ */ from_html(`<style>/* styles required to make position sticky work */
      /* existing styles on an Odyssey body are preventing position sticky from 'sticking' */
      body {
        overflow: visible;
      }</style>`);
var root = /* @__PURE__ */ from_html(`<!> <!> <!> <div class="scrollyteller-wrapper svelte-ai6dtf"><!> <div><!> <!></div></div>`, 1);
const $$css = {
  hash: "svelte-ai6dtf",
  code: '.scrollyteller-wrapper.svelte-ai6dtf {position:relative;transition:opacity 0.25s;}.scrollyteller.svelte-ai6dtf {position:relative;--maxScrollytellerWidth: min(var(--maxScrollytellerWidthPx), 100vw);--marginOuter: 1rem;margin:0 auto;max-width:calc(var(--maxScrollytellerWidth) - var(--marginOuter) * 2);--vizMaxWidth: 1;--vizMarginOuter: 1.5rem;\n  /* Force full width when using the mobile row variant */}\n@media (max-width: 62rem) {.scrollyteller.scrollyteller--mobile-row-variant.svelte-ai6dtf {--marginOuter: 0;--vizMarginOuter: 0;}\n}\n@media (min-width: 46.5rem) {.scrollyteller.svelte-ai6dtf {--marginOuter: 2rem;--vizMarginOuter: 3rem;}\n}\n@media (min-width: 62rem) {.scrollyteller.svelte-ai6dtf {--marginOuter: 2rem;--vizMarginOuter: 3rem;--vizMaxWidth: 0.55;}.scrollyteller--columns.svelte-ai6dtf {width:fit-content;}\n}\n@media (min-width: 75rem) {.scrollyteller.svelte-ai6dtf {--marginOuter: 3rem;--vizMarginOuter: 4rem;--vizMaxWidth: 0.7;}\n}\n@media (min-width: 90rem) {.scrollyteller.svelte-ai6dtf {--marginOuter: 4rem;--vizMarginOuter: 6rem;}\n}.scrollyteller--debug.svelte-ai6dtf:after {content:"Mobile";position:fixed;right:0.5rem;top:0.5rem;padding:0.5rem 1rem;background:white;color:black;border:5px solid limegreen;border-radius:1rem;z-index:110;}\n@media (min-width: 46.5rem) {.scrollyteller--debug.svelte-ai6dtf:after {content:"Tablet";}\n}\n@media (min-width: 62rem) {.scrollyteller--debug.svelte-ai6dtf:after {content:"LargeTablet";}\n}\n@media (min-width: 75rem) {.scrollyteller--debug.svelte-ai6dtf:after {content:"Desktop";}\n}\n@media (min-width: 90rem) {.scrollyteller--debug.svelte-ai6dtf:after {content:"LargeDesktop";}\n}'
};
function Scrollyteller($$anchor, $$props) {
  push($$props, true);
  append_styles$1($$anchor, $$css);
  const $vizDimsStore = () => store_get(vizDimsStore, "$vizDimsStore", $$stores);
  const $maxScrollytellerWidthStore = () => store_get(maxScrollytellerWidthStore, "$maxScrollytellerWidthStore", $$stores);
  const $maxGraphicWidthStore = () => store_get(maxGraphicWidthStore, "$maxGraphicWidthStore", $$stores);
  const [$$stores, $$cleanup] = setup_stores();
  setContext("steps", setSteps());
  setContext("margin", setMargin());
  const vizDimsStore = setContext("vizDims", setVizDims());
  const graphicRootDimsStore = setContext("graphicRootDims", setGraphicRootDims());
  const ratioStore = setContext("ratio", setRatio());
  const screenDimsStore = setContext("screenDims", setScreenDims());
  const globalAlignStore = setContext("globalAlign", setGlobalAlign());
  const mobileVariantStore = setContext("mobileVariant", setMobileVariant());
  const isSplitScreenStore = setContext("isSplitScreen", setIsSplitScreen([screenDimsStore, globalAlignStore]));
  setContext("isMobileRowMode", setIsMobileRowMode([screenDimsStore, mobileVariantStore]));
  const maxScrollytellerWidthStore = setContext("maxScrollytellerWidth", setMaxScrollytellerWidth([isSplitScreenStore]));
  const maxGraphicWidthStore = setContext("maxGraphicWidth", setMaxGraphicWidth([
    isSplitScreenStore,
    graphicRootDimsStore,
    screenDimsStore,
    ratioStore,
    maxScrollytellerWidthStore
  ]));
  setContext("currentPanel", setCurrentPanel());
  let customPanel = prop($$props, "customPanel", 7, null), panels = prop($$props, "panels", 7), onProgress = prop($$props, "onProgress", 7, (type, payload) => {
  }), onMarker = prop($$props, "onMarker", 7, (marker2) => {
  }), onLoad = prop($$props, "onLoad", 7, () => {
  }), observerOptions = prop($$props, "observerOptions", 7, void 0), discardSlot = prop($$props, "discardSlot", 7, false), layout = prop($$props, "layout", 23, () => ({})), ratio = prop($$props, "ratio", 7, 1), vizMarkerThreshold = prop($$props, "vizMarkerThreshold", 7, 20), children2 = prop($$props, "children", 7);
  const isOdyssey = !!window.__IS_ODYSSEY_FORMAT__;
  let scrollytellerRef = /* @__PURE__ */ state(void 0);
  let marker = /* @__PURE__ */ state(void 0);
  let isInViewport = /* @__PURE__ */ state(false);
  let scrollSpeed = 0;
  let deferUntilScrollSettlesActions = [];
  let panelRoot = /* @__PURE__ */ state(void 0);
  const scrollytellerObserver = new IntersectionObserver(([scrollytellerEntry]) => deferUntilScrollSettles(() => {
    set(isInViewport, scrollytellerEntry.isIntersecting, true);
  }));
  const deferUntilScrollSettles = (fn) => {
    if (scrollSpeed < get$1(maxScrollSpeed)) {
      fn();
    } else {
      deferUntilScrollSettlesActions = [...deferUntilScrollSettlesActions, fn];
    }
  };
  const runDeferredActions = () => {
    if (scrollSpeed < get$1(maxScrollSpeed)) {
      if (deferUntilScrollSettlesActions.length) {
        deferUntilScrollSettlesActions.forEach((fn) => fn());
        deferUntilScrollSettlesActions = [];
      }
    }
  };
  onMount(() => {
    if (discardSlot()) {
      scrollytellerObserver.observe(get$1(scrollytellerRef));
    }
    getScrollSpeed((newSpeed) => {
      scrollSpeed = newSpeed;
      runDeferredActions();
    });
  });
  let _layout = /* @__PURE__ */ user_derived(() => ({
    align: layout().align || "centre",
    mobileVariant: layout().mobileVariant || "blocks",
    // or rows
    resizeInteractive: layout().resizeInteractive ?? true,
    transparentFloat: layout().transparentFloat ?? ["left", "right"].includes(layout().align)
  }));
  let _observerOptions = /* @__PURE__ */ user_derived(() => ({
    rootMargin: get$1(_layout).mobileVariant === "rows" ? "-50% 0% 0% 0%" : void 0,
    ...observerOptions() || {}
  }));
  user_effect(() => {
    store_set(ratioStore, ratio());
  });
  user_effect(() => {
    if (vizMarkerThreshold() >= 50) {
      throw new Error("vizMarkerThreshold must be <50% screen height");
    }
  });
  let maxScrollSpeed = /* @__PURE__ */ user_derived(() => discardSlot() ? 0.5 : Infinity);
  user_effect(() => {
    get$1(marker) && deferUntilScrollSettles(() => onMarker()(snapshot(get$1(marker))));
  });
  let isDebug = /* @__PURE__ */ user_derived(() => typeof location !== "undefined" && location.hash === "#debug=true");
  var $$exports = {
    get customPanel() {
      return customPanel();
    },
    set customPanel($$value = null) {
      customPanel($$value);
      flushSync();
    },
    get panels() {
      return panels();
    },
    set panels($$value) {
      panels($$value);
      flushSync();
    },
    get onProgress() {
      return onProgress();
    },
    set onProgress($$value = (type, payload) => {
    }) {
      onProgress($$value);
      flushSync();
    },
    get onMarker() {
      return onMarker();
    },
    set onMarker($$value = (marker2) => {
    }) {
      onMarker($$value);
      flushSync();
    },
    get onLoad() {
      return onLoad();
    },
    set onLoad($$value = () => {
    }) {
      onLoad($$value);
      flushSync();
    },
    get observerOptions() {
      return observerOptions();
    },
    set observerOptions($$value = void 0) {
      observerOptions($$value);
      flushSync();
    },
    get discardSlot() {
      return discardSlot();
    },
    set discardSlot($$value = false) {
      discardSlot($$value);
      flushSync();
    },
    get layout() {
      return layout();
    },
    set layout($$value = {}) {
      layout($$value);
      flushSync();
    },
    get ratio() {
      return ratio();
    },
    set ratio($$value = 1) {
      ratio($$value);
      flushSync();
    },
    get vizMarkerThreshold() {
      return vizMarkerThreshold();
    },
    set vizMarkerThreshold($$value = 20) {
      vizMarkerThreshold($$value);
      flushSync();
    },
    get children() {
      return children2();
    },
    set children($$value) {
      children2($$value);
      flushSync();
    }
  };
  var fragment_1 = root();
  head("ai6dtf", ($$anchor2) => {
    var fragment = comment();
    var node = first_child(fragment);
    {
      var consequent = ($$anchor3) => {
        var style = root_2();
        append($$anchor3, style);
      };
      if_block(node, ($$render) => {
        if (isOdyssey) $$render(consequent);
      });
    }
    append($$anchor2, fragment);
  });
  var node_1 = first_child(fragment_1);
  {
    var consequent_1 = ($$anchor2) => {
      OnProgressHandler($$anchor2, {
        get scrollytellerRef() {
          return get$1(scrollytellerRef);
        },
        get onProgress() {
          return onProgress();
        }
      });
    };
    if_block(node_1, ($$render) => {
      if (onProgress()) $$render(consequent_1);
    });
  }
  var node_2 = sibling(node_1, 2);
  ScreenDimsStoreUpdater(node_2, {
    get align() {
      return get$1(_layout).align;
    },
    get mobileVariant() {
      return get$1(_layout).mobileVariant;
    }
  });
  var node_3 = sibling(node_2, 2);
  PanelObserver(node_3, {
    get observerOptions() {
      return get$1(_observerOptions);
    },
    get vizMarkerThreshold() {
      return vizMarkerThreshold();
    },
    get marker() {
      return get$1(marker);
    },
    set marker($$value) {
      set(marker, $$value, true);
    }
  });
  var div = sibling(node_3, 2);
  let styles;
  var node_4 = child(div);
  {
    var consequent_2 = ($$anchor2) => {
      Viz($$anchor2, {
        get layout() {
          return get$1(_layout);
        },
        get isInViewport() {
          return get$1(isInViewport);
        },
        get discardSlot() {
          return discardSlot();
        },
        get onLoad() {
          return onLoad();
        },
        children: ($$anchor3, $$slotProps) => {
          var fragment_4 = comment();
          var node_5 = first_child(fragment_4);
          snippet(node_5, () => children2() ?? noop);
          append($$anchor3, fragment_4);
        },
        $$slots: { default: true }
      });
    };
    if_block(node_4, ($$render) => {
      if (!get$1(_layout).resizeInteractive) $$render(consequent_2);
    });
  }
  var div_1 = sibling(node_4, 2);
  let classes;
  let styles_1;
  var node_6 = child(div_1);
  {
    var consequent_3 = ($$anchor2) => {
      Viz($$anchor2, {
        get layout() {
          return get$1(_layout);
        },
        get isInViewport() {
          return get$1(isInViewport);
        },
        get discardSlot() {
          return discardSlot();
        },
        get onLoad() {
          return onLoad();
        },
        children: ($$anchor3, $$slotProps) => {
          var fragment_6 = comment();
          var node_7 = first_child(fragment_6);
          snippet(node_7, () => children2() ?? noop);
          append($$anchor3, fragment_6);
        },
        $$slots: { default: true }
      });
    };
    if_block(node_6, ($$render) => {
      if (get$1(_layout).resizeInteractive) $$render(consequent_3);
    });
  }
  var node_8 = sibling(node_6, 2);
  Panels(node_8, {
    get layout() {
      return get$1(_layout);
    },
    get panels() {
      return panels();
    },
    get customPanel() {
      return customPanel();
    },
    get panelRoot() {
      return get$1(panelRoot);
    },
    set panelRoot($$value) {
      set(panelRoot, $$value, true);
    }
  });
  reset(div_1);
  bind_this(div_1, ($$value) => set(scrollytellerRef, $$value), () => get$1(scrollytellerRef));
  reset(div);
  template_effect(
    ($0) => {
      styles = set_style(div, "", styles, { opacity: $vizDimsStore().status === "ready" ? 1 : 0 });
      classes = set_class(div_1, 1, "scrollyteller svelte-ai6dtf", null, classes, $0);
      styles_1 = set_style(div_1, "", styles_1, {
        "--maxScrollytellerWidthPx": $maxScrollytellerWidthStore() + "px",
        "--rightColumnWidth": `min(calc(var(--maxScrollytellerWidth) * var(--vizMaxWidth)), ${$maxGraphicWidthStore()}px)`
      });
    },
    [
      () => ({
        "scrollyteller--resized": get$1(_layout).resizeInteractive,
        "scrollyteller--debug": get$1(isDebug),
        "scrollyteller--columns": ["left", "right"].includes(get$1(_layout).align),
        "scrollyteller--mobile-row-variant": ["rows"].includes(get$1(_layout).mobileVariant)
      })
    ]
  );
  append($$anchor, fragment_1);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(
  Scrollyteller,
  {
    customPanel: {},
    panels: {},
    onProgress: {},
    onMarker: {},
    onLoad: {},
    observerOptions: {},
    discardSlot: {},
    layout: {},
    ratio: {},
    vizMarkerThreshold: {},
    children: {}
  },
  [],
  [],
  true
);
function Scrollyteller_wc($$anchor, $$props) {
  push($$props, true);
  let panels = prop($$props, "panels", 23, () => []), layout = prop($$props, "layout", 23, () => ({})), rest = /* @__PURE__ */ rest_props($$props, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "panels",
    "layout"
  ]);
  var $$exports = {
    get panels() {
      return panels();
    },
    set panels($$value) {
      panels($$value);
    },
    get layout() {
      return layout();
    },
    set layout($$value) {
      layout($$value);
    },
    get panels() {
      return panels();
    },
    set panels($$value = []) {
      panels($$value);
      flushSync();
    },
    get layout() {
      return layout();
    },
    set layout($$value = {}) {
      layout($$value);
      flushSync();
    }
  };
  var fragment = comment();
  var node = first_child(fragment);
  {
    var consequent = ($$anchor2) => {
      Scrollyteller($$anchor2, spread_props(
        {
          get panels() {
            return panels();
          },
          get layout() {
            return layout();
          }
        },
        () => rest
      ));
    };
    if_block(node, ($$render) => {
      if (panels().length) $$render(consequent);
    });
  }
  append($$anchor, fragment);
  return pop($$exports);
}
customElements.define("abcnews-scrollyteller", create_custom_element(Scrollyteller_wc, { panels: {}, layout: {} }, [], ["panels", "layout"], false));
var makeArray = function(val) {
  return Array.isArray(val) ? val.map(String) : [String(val)];
};
function parse(string, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.propMap, propMap = _a2 === void 0 ? {} : _a2, _b = options.arrayProps, arrayProps = _b === void 0 ? [] : _b, _c = options.noTypeGuessing, noTypeGuessing = _c === void 0 ? [] : _c;
  var config = string.match(/[A-Z]+([0-9a-z]|$)+/g) || [];
  arrayProps = makeArray(arrayProps);
  noTypeGuessing = makeArray(noTypeGuessing);
  var result = config.map(function(str) {
    var _a3 = str.match(/^([A-Z]+)([0-9a-z]*$)/) || [], keyStr = _a3[1], valueStr = _a3[2];
    if (typeof keyStr !== "string" || typeof valueStr !== "string") {
      throw new Error("Error reading key/value pair");
    }
    var key = propMap[keyStr.toLowerCase()] || keyStr.toLowerCase();
    var value = noTypeGuessing.includes(key) ? valueStr : parseFloat(valueStr).toString() === valueStr ? parseFloat(valueStr) : valueStr === "true" || valueStr === "yes" ? true : valueStr === "false" || valueStr === "no" ? false : valueStr === "" ? null : valueStr;
    return { key, value };
  }).reduce(
    /** @param {Object<string,any>} obj */
    function(obj, _a3, _, arr) {
      var key = _a3.key, value = _a3.value;
      if (typeof obj[key] !== "undefined")
        return obj;
      var allKeyValues = arr.filter(function(_a4) {
        var k = _a4.key;
        return k === key;
      }).map(function(d) {
        return d.value;
      });
      var isArray = arrayProps.includes(key) || allKeyValues.length > 1;
      if (isArray) {
        var types = new Set(allKeyValues.map(function(val) {
          return typeof val;
        }));
        if (types.size > 1) {
          throw new Error("Inconsistent types in array property '".concat(key, "'"));
        }
        obj[key] = allKeyValues;
      } else {
        obj[key] = value;
      }
      return obj;
    },
    {}
  );
  arrayProps.forEach(function(key) {
    if (typeof result[key] === "undefined") {
      result[key] = [];
    }
  });
  return result;
}
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var ERROR_MOUNT_ALREADY_USED = "Mount point already used.";
var INSTANCE_ID = (() => {
  let a = 0, b;
  for (b = ""; a++ < 36; b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : "-")
    ;
  return b;
})();
var MOUNT_SELECTOR_TEMPLATE = ["[data-mount][id", "]"];
var MOUNT_SELECTOR = MOUNT_SELECTOR_TEMPLATE.join("");
var mountSelectorCache = {};
function cachedMountSelector(cacheKey) {
  if (!mountSelectorCache[cacheKey]) {
    mountSelectorCache[cacheKey] = MOUNT_SELECTOR_TEMPLATE.join(cacheKey);
  }
  return mountSelectorCache[cacheKey];
}
function exactMountSelector(value) {
  return cachedMountSelector(`="${value}"`);
}
function prefixedMountSelector(prefix) {
  return cachedMountSelector(`^="${prefix}"`);
}
function isNode(x) {
  return typeof x === "object" && x instanceof Node;
}
function isElement(x) {
  return isNode(x) && x.nodeType === Node.ELEMENT_NODE;
}
function isMount(x, value, exact = false) {
  return isElement(x) && (value === void 0 ? x.matches(MOUNT_SELECTOR) : exact ? x.matches(exactMountSelector(value)) : x.matches(prefixedMountSelector(value)));
}
function getMountValue(el, value = "") {
  const re = new RegExp(`^${value.replace(/[^\w.\-:]/g, "")}`);
  return (el.getAttribute("id") || el.getAttribute("name") || "").replace(
    re,
    ""
  );
}
function isUsed(mount2) {
  return !!mount2.dataset.mountUsed;
}
function isUsedBy(mount2) {
  return mount2.dataset.mountUsed;
}
function useMount(mount2) {
  if (mount2.dataset.mountUsed && mount2.dataset.mountUsed !== INSTANCE_ID)
    throw new Error(ERROR_MOUNT_ALREADY_USED);
  mount2.dataset.mountUsed = INSTANCE_ID;
  return mount2;
}
function selectMounts(selector, {
  exact = false,
  includeOwnUsed = false,
  markAsUsed = true
} = {}) {
  const s = selector !== void 0 ? exact ? exactMountSelector(selector) : prefixedMountSelector(selector) : MOUNT_SELECTOR;
  return Array.from(document.querySelectorAll(s)).filter((el) => isMount(el)).filter(
    (mount2) => includeOwnUsed ? isUsedBy(mount2) === INSTANCE_ID || !isUsed(mount2) : !isUsed(mount2)
  ).map((mount2) => {
    markAsUsed && useMount(mount2);
    return mount2;
  });
}
const piecemeal = Symbol("piecemeal");
const SELECTOR_COMMON = "scrollyteller";
function excludePanelMeta(config) {
  const _config = {
    ...config
  };
  delete _config[piecemeal];
  delete _config.align;
  return _config;
}
const loadScrollyteller = (name, className, markerName = "mark") => {
  window.__scrollytellers = window.__scrollytellers || {};
  const openingMountValuePrefix = `${SELECTOR_COMMON}${name ? `NAME${name}` : ""}`;
  name = name || "scrollyteller";
  if (!window.__scrollytellers[name]) {
    const firstEl = selectMounts(openingMountValuePrefix)[0];
    if (!firstEl) {
      throw new Error(`Couldn't find element for #${openingMountValuePrefix}`);
    }
    if (!isMount(firstEl)) {
      throw new Error("Attempting to mount to a non-mount node");
    }
    className && firstEl.classList.add(className);
    const config = parse(getMountValue(firstEl, openingMountValuePrefix));
    const els = [];
    let el = firstEl.nextElementSibling;
    let hasMoreContent = true;
    while (hasMoreContent && el) {
      if (isMount(el, `end${SELECTOR_COMMON}`, true)) {
        hasMoreContent = false;
      } else {
        els.push(el);
        el = el.nextElementSibling;
      }
    }
    window.__scrollytellers[name] = {
      mountNode: firstEl,
      panels: loadPanels(els, config, markerName)
    };
  }
  return window.__scrollytellers[name];
};
const loadPanels = (nodes, initialConfig, name) => {
  const panels = [];
  let nextConfigAndMeta = initialConfig;
  let nextNodes = [];
  function pushPanel() {
    if (nextNodes.length === 0) return;
    panels.push({
      align: nextConfigAndMeta.align,
      data: excludePanelMeta(nextConfigAndMeta),
      nodes: nextNodes
    });
    nextNodes = [];
  }
  nodes.forEach((node, index2) => {
    if (isMount(node, name)) {
      pushPanel();
      const configString = getMountValue(node, name);
      if (configString) {
        nextConfigAndMeta = parse(configString);
      } else {
        nextConfigAndMeta[piecemeal] = false;
      }
    } else {
      nextNodes.push(node);
    }
    if (index2 === nodes.length - 1) {
      pushPanel();
    }
    if (nextConfigAndMeta[piecemeal]) {
      pushPanel();
    }
    node.parentNode && node.parentNode.removeChild(node);
  });
  return panels;
};
export {
  Scrollyteller_wc as default,
  loadScrollyteller
};
