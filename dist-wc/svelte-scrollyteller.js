var __defProp = Object.defineProperty;
var __typeError = (msg) => {
	throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) =>
	key in obj
		? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
		: (obj[key] = value);
var __publicField = (obj, key, value) =>
	__defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError('Cannot ' + msg);
var __privateGet = (obj, member, getter) => (
	__accessCheck(obj, member, 'read from private field'), getter ? getter.call(obj) : member.get(obj)
);
var __privateAdd = (obj, member, value) =>
	member.has(obj)
		? __typeError('Cannot add the same private member more than once')
		: member instanceof WeakSet
			? member.add(obj)
			: member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (
	__accessCheck(obj, member, 'write to private field'),
	setter ? setter.call(obj, value) : member.set(obj, value),
	value
);
var _events, _instance;
const PUBLIC_VERSION = '5';
if (typeof window !== 'undefined')
	(window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
let legacy_mode_flag = false;
let tracing_mode_flag = false;
function enable_legacy_mode_flag() {
	legacy_mode_flag = true;
}
enable_legacy_mode_flag();
const EACH_ITEM_REACTIVE = 1;
const EACH_INDEX_REACTIVE = 1 << 1;
const EACH_IS_CONTROLLED = 1 << 2;
const EACH_IS_ANIMATED = 1 << 3;
const EACH_ITEM_IMMUTABLE = 1 << 4;
const PROPS_IS_IMMUTABLE = 1;
const PROPS_IS_RUNES = 1 << 1;
const PROPS_IS_UPDATED = 1 << 2;
const PROPS_IS_BINDABLE = 1 << 3;
const PROPS_IS_LAZY_INITIAL = 1 << 4;
const TEMPLATE_FRAGMENT = 1;
const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
const HYDRATION_START = '[';
const HYDRATION_START_ELSE = '[!';
const HYDRATION_END = ']';
const HYDRATION_ERROR = {};
const UNINITIALIZED = Symbol();
const DEV = false;
const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const RENDER_EFFECT = 1 << 3;
const BLOCK_EFFECT = 1 << 4;
const BRANCH_EFFECT = 1 << 5;
const ROOT_EFFECT = 1 << 6;
const BOUNDARY_EFFECT = 1 << 7;
const UNOWNED = 1 << 8;
const DISCONNECTED = 1 << 9;
const CLEAN = 1 << 10;
const DIRTY = 1 << 11;
const MAYBE_DIRTY = 1 << 12;
const INERT = 1 << 13;
const DESTROYED = 1 << 14;
const EFFECT_RAN = 1 << 15;
const EFFECT_TRANSPARENT = 1 << 16;
const LEGACY_DERIVED_PROP = 1 << 17;
const HEAD_EFFECT = 1 << 19;
const EFFECT_HAS_DERIVED = 1 << 20;
const STATE_SYMBOL = Symbol('$state');
const LEGACY_PROPS = Symbol('legacy props');
const LOADING_ATTR_SYMBOL = Symbol('');
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
function is_function(thing) {
	return typeof thing === 'function';
}
const noop = () => {};
function run(fn) {
	return fn();
}
function run_all(arr) {
	for (var i = 0; i < arr.length; i++) {
		arr[i]();
	}
}
let micro_tasks = [];
let idle_tasks = [];
function run_micro_tasks() {
	var tasks = micro_tasks;
	micro_tasks = [];
	run_all(tasks);
}
function run_idle_tasks() {
	var tasks = idle_tasks;
	idle_tasks = [];
	run_all(tasks);
}
function queue_micro_task(fn) {
	if (micro_tasks.length === 0) {
		queueMicrotask(run_micro_tasks);
	}
	micro_tasks.push(fn);
}
function flush_tasks() {
	if (micro_tasks.length > 0) {
		run_micro_tasks();
	}
	if (idle_tasks.length > 0) {
		run_idle_tasks();
	}
}
function equals(value) {
	return value === this.v;
}
function safe_not_equal(a, b) {
	return a != a
		? b == b
		: a !== b || (a !== null && typeof a === 'object') || typeof a === 'function';
}
function safe_equals(value) {
	return !safe_not_equal(value, this.v);
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
function state_unsafe_local_read() {
	{
		throw new Error(`https://svelte.dev/e/state_unsafe_local_read`);
	}
}
function state_unsafe_mutation() {
	{
		throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
	}
}
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
function mutable_source(initial_value, immutable = false) {
	var _a;
	const s = source(initial_value);
	if (!immutable) {
		s.equals = safe_equals;
	}
	if (legacy_mode_flag && component_context !== null && component_context.l !== null) {
		((_a = component_context.l).s ?? (_a.s = [])).push(s);
	}
	return s;
}
function mutable_state(v, immutable = false) {
	return /* @__PURE__ */ push_derived_source(/* @__PURE__ */ mutable_source(v, immutable));
}
// @__NO_SIDE_EFFECTS__
function push_derived_source(source2) {
	if (active_reaction !== null && !untracking && (active_reaction.f & DERIVED) !== 0) {
		if (derived_sources === null) {
			set_derived_sources([source2]);
		} else {
			derived_sources.push(source2);
		}
	}
	return source2;
}
function mutate(source2, value) {
	set(
		source2,
		untrack(() => get$1(source2))
	);
	return value;
}
function set(source2, value) {
	if (
		active_reaction !== null &&
		!untracking &&
		is_runes() &&
		(active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 && // If the source was created locally within the current derived, then
		// we allow the mutation.
		(derived_sources === null || !derived_sources.includes(source2))
	) {
		state_unsafe_mutation();
	}
	return internal_set(source2, value);
}
function internal_set(source2, value) {
	if (!source2.equals(value)) {
		source2.v;
		source2.v = value;
		source2.wv = increment_write_version();
		mark_reactions(source2, DIRTY);
		if (
			is_runes() &&
			active_effect !== null &&
			(active_effect.f & CLEAN) !== 0 &&
			(active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0
		) {
			if (untracked_writes === null) {
				set_untracked_writes([source2]);
			} else {
				untracked_writes.push(source2);
			}
		}
	}
	return value;
}
function update(source2, d = 1) {
	var value = get$1(source2);
	var result = d === 1 ? value++ : value--;
	set(source2, value);
	return result;
}
function mark_reactions(signal, status) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	var runes = is_runes();
	var length = reactions.length;
	for (var i = 0; i < length; i++) {
		var reaction = reactions[i];
		var flags = reaction.f;
		if ((flags & DIRTY) !== 0) continue;
		if (!runes && reaction === active_effect) continue;
		set_signal_status(reaction, status);
		if ((flags & (CLEAN | UNOWNED)) !== 0) {
			if ((flags & DERIVED) !== 0) {
				mark_reactions(
					/** @type {Derived} */
					reaction,
					MAYBE_DIRTY
				);
			} else {
				schedule_effect(
					/** @type {Effect} */
					reaction
				);
			}
		}
	}
}
// @__NO_SIDE_EFFECTS__
function derived$1(fn) {
	var flags = DERIVED | DIRTY;
	var parent_derived =
		active_reaction !== null && (active_reaction.f & DERIVED) !== 0
			? /** @type {Derived} */
				active_reaction
			: null;
	if (active_effect === null || (parent_derived !== null && (parent_derived.f & UNOWNED) !== 0)) {
		flags |= UNOWNED;
	} else {
		active_effect.f |= EFFECT_HAS_DERIVED;
	}
	const signal = {
		ctx: component_context,
		deps: null,
		effects: null,
		equals,
		f: flags,
		fn,
		reactions: null,
		rv: 0,
		v:
			/** @type {V} */
			null,
		wv: 0,
		parent: parent_derived ?? active_effect
	};
	return signal;
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
			return (
				/** @type {Effect} */
				parent
			);
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
	var status =
		(skip_reaction || (derived2.f & UNOWNED) !== 0) && derived2.deps !== null ? MAYBE_DIRTY : CLEAN;
	set_signal_status(derived2, status);
	if (!derived2.equals(value)) {
		derived2.v = value;
		derived2.wv = increment_write_version();
	}
}
function hydration_mismatch(location2) {
	{
		console.warn(`https://svelte.dev/e/hydration_mismatch`);
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
	return (hydrate_node = node);
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
function remove_nodes() {
	var depth = 0;
	var node = hydrate_node;
	while (true) {
		if (node.nodeType === 8) {
			var data =
				/** @type {Comment} */
				node.data;
			if (data === HYDRATION_END) {
				if (depth === 0) return node;
				depth -= 1;
			} else if (data === HYDRATION_START || data === HYDRATION_START_ELSE) {
				depth += 1;
			}
		}
		var next =
			/** @type {TemplateNode} */
			/* @__PURE__ */ get_next_sibling(node);
		node.remove();
		node = next;
	}
}
function proxy(value, parent = null, prev) {
	if (typeof value !== 'object' || value === null || STATE_SYMBOL in value) {
		return value;
	}
	const prototype = get_prototype_of(value);
	if (prototype !== object_prototype && prototype !== array_prototype) {
		return value;
	}
	var sources = /* @__PURE__ */ new Map();
	var is_proxied_array = is_array(value);
	var version = source(0);
	if (is_proxied_array) {
		sources.set(
			'length',
			source(
				/** @type {any[]} */
				value.length
			)
		);
	}
	var metadata;
	return new Proxy(
		/** @type {any} */
		value,
		{
			defineProperty(_, prop2, descriptor) {
				if (
					!('value' in descriptor) ||
					descriptor.configurable === false ||
					descriptor.enumerable === false ||
					descriptor.writable === false
				) {
					state_descriptors_fixed();
				}
				var s = sources.get(prop2);
				if (s === void 0) {
					s = source(descriptor.value);
					sources.set(prop2, s);
				} else {
					set(s, proxy(descriptor.value, metadata));
				}
				return true;
			},
			deleteProperty(target, prop2) {
				var s = sources.get(prop2);
				if (s === void 0) {
					if (prop2 in target) {
						sources.set(prop2, source(UNINITIALIZED));
					}
				} else {
					if (is_proxied_array && typeof prop2 === 'string') {
						var ls =
							/** @type {Source<number>} */
							sources.get('length');
						var n = Number(prop2);
						if (Number.isInteger(n) && n < ls.v) {
							set(ls, n);
						}
					}
					set(s, UNINITIALIZED);
					update_version(version);
				}
				return true;
			},
			get(target, prop2, receiver) {
				var _a;
				if (prop2 === STATE_SYMBOL) {
					return value;
				}
				var s = sources.get(prop2);
				var exists = prop2 in target;
				if (
					s === void 0 &&
					(!exists || ((_a = get_descriptor(target, prop2)) == null ? void 0 : _a.writable))
				) {
					s = source(proxy(exists ? target[prop2] : UNINITIALIZED, metadata));
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
				if (descriptor && 'value' in descriptor) {
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
				var _a;
				if (prop2 === STATE_SYMBOL) {
					return true;
				}
				var s = sources.get(prop2);
				var has = (s !== void 0 && s.v !== UNINITIALIZED) || Reflect.has(target, prop2);
				if (
					s !== void 0 ||
					(active_effect !== null &&
						(!has || ((_a = get_descriptor(target, prop2)) == null ? void 0 : _a.writable)))
				) {
					if (s === void 0) {
						s = source(has ? proxy(target[prop2], metadata) : UNINITIALIZED);
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
				var _a;
				var s = sources.get(prop2);
				var has = prop2 in target;
				if (is_proxied_array && prop2 === 'length') {
					for (var i = value2; i < /** @type {Source<number>} */ s.v; i += 1) {
						var other_s = sources.get(i + '');
						if (other_s !== void 0) {
							set(other_s, UNINITIALIZED);
						} else if (i in target) {
							other_s = source(UNINITIALIZED);
							sources.set(i + '', other_s);
						}
					}
				}
				if (s === void 0) {
					if (!has || ((_a = get_descriptor(target, prop2)) == null ? void 0 : _a.writable)) {
						s = source(void 0);
						set(s, proxy(value2, metadata));
						sources.set(prop2, s);
					}
				} else {
					has = s.v !== UNINITIALIZED;
					set(s, proxy(value2, metadata));
				}
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
				if (descriptor == null ? void 0 : descriptor.set) {
					descriptor.set.call(receiver, value2);
				}
				if (!has) {
					if (is_proxied_array && typeof prop2 === 'string') {
						var ls =
							/** @type {Source<number>} */
							sources.get('length');
						var n = Number(prop2);
						if (Number.isInteger(n) && n >= ls.v) {
							set(ls, n + 1);
						}
					}
					update_version(version);
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
function update_version(signal, d = 1) {
	set(signal, signal.v + d);
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
	first_child_getter = get_descriptor(node_prototype, 'firstChild').get;
	next_sibling_getter = get_descriptor(node_prototype, 'nextSibling').get;
	element_prototype.__click = void 0;
	element_prototype.__className = void 0;
	element_prototype.__attributes = null;
	element_prototype.__styles = null;
	element_prototype.__e = void 0;
	Text.prototype.__t = void 0;
}
function create_text(value = '') {
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
	var child2 =
		/** @type {TemplateNode} */
		/* @__PURE__ */ get_first_child(hydrate_node);
	if (child2 === null) {
		child2 = hydrate_node.appendChild(create_text());
	}
	set_hydrate_node(child2);
	return child2;
}
function first_child(fragment, is_text) {
	if (!hydrating) {
		var first =
			/** @type {DocumentFragment} */
			/* @__PURE__ */ get_first_child(
				/** @type {Node} */
				fragment
			);
		if (first instanceof Comment && first.data === '')
			return /* @__PURE__ */ get_next_sibling(first);
		return first;
	}
	return hydrate_node;
}
function sibling(node, count = 1, is_text = false) {
	let next_sibling = hydrating ? hydrate_node : node;
	var last_sibling;
	while (count--) {
		last_sibling = next_sibling;
		next_sibling = /** @type {TemplateNode} */ /* @__PURE__ */ get_next_sibling(next_sibling);
	}
	if (!hydrating) {
		return next_sibling;
	}
	var type = next_sibling == null ? void 0 : next_sibling.nodeType;
	if (is_text && type !== 3) {
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
	node.textContent = '';
}
let is_throwing_error = false;
let is_flushing = false;
let last_scheduled_effect = null;
let is_updating_effect = false;
let is_destroying_effect = false;
function set_is_destroying_effect(value) {
	is_destroying_effect = value;
}
let queued_root_effects = [];
let dev_effect_stack = [];
let active_reaction = null;
let untracking = false;
function set_active_reaction(reaction) {
	active_reaction = reaction;
}
let active_effect = null;
function set_active_effect(effect2) {
	active_effect = effect2;
}
let derived_sources = null;
function set_derived_sources(sources) {
	derived_sources = sources;
}
let new_deps = null;
let skipped_deps = 0;
let untracked_writes = null;
function set_untracked_writes(value) {
	untracked_writes = value;
}
let write_version = 1;
let read_version = 0;
let skip_reaction = false;
function increment_write_version() {
	return ++write_version;
}
function check_dirtiness(reaction) {
	var _a;
	var flags = reaction.f;
	if ((flags & DIRTY) !== 0) {
		return true;
	}
	if ((flags & MAYBE_DIRTY) !== 0) {
		var dependencies = reaction.deps;
		var is_unowned = (flags & UNOWNED) !== 0;
		if (dependencies !== null) {
			var i;
			var dependency;
			var is_disconnected = (flags & DISCONNECTED) !== 0;
			var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
			var length = dependencies.length;
			if (is_disconnected || is_unowned_connected) {
				var derived2 =
					/** @type {Derived} */
					reaction;
				var parent = derived2.parent;
				for (i = 0; i < length; i++) {
					dependency = dependencies[i];
					if (
						is_disconnected ||
						!((_a = dependency == null ? void 0 : dependency.reactions) == null
							? void 0
							: _a.includes(derived2))
					) {
						(dependency.reactions ?? (dependency.reactions = [])).push(derived2);
					}
				}
				if (is_disconnected) {
					derived2.f ^= DISCONNECTED;
				}
				if (is_unowned_connected && parent !== null && (parent.f & UNOWNED) === 0) {
					derived2.f ^= UNOWNED;
				}
			}
			for (i = 0; i < length; i++) {
				dependency = dependencies[i];
				if (
					check_dirtiness(
						/** @type {Derived} */
						dependency
					)
				) {
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
		if (!is_unowned || (active_effect !== null && !skip_reaction)) {
			set_signal_status(reaction, CLEAN);
		}
	}
	return false;
}
function propagate_error(error, effect2) {
	var current = effect2;
	while (current !== null) {
		if ((current.f & BOUNDARY_EFFECT) !== 0) {
			try {
				current.fn(error);
				return;
			} catch {
				current.f ^= BOUNDARY_EFFECT;
			}
		}
		current = current.parent;
	}
	is_throwing_error = false;
	throw error;
}
function should_rethrow_error(effect2) {
	return (
		(effect2.f & DESTROYED) === 0 &&
		(effect2.parent === null || (effect2.parent.f & BOUNDARY_EFFECT) === 0)
	);
}
function handle_error(error, effect2, previous_effect, component_context2) {
	if (is_throwing_error) {
		if (previous_effect === null) {
			is_throwing_error = false;
		}
		if (should_rethrow_error(effect2)) {
			throw error;
		}
		return;
	}
	if (previous_effect !== null) {
		is_throwing_error = true;
	}
	{
		propagate_error(error, effect2);
		return;
	}
}
function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
	var reactions = signal.reactions;
	if (reactions === null) return;
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
	var _a;
	var previous_deps = new_deps;
	var previous_skipped_deps = skipped_deps;
	var previous_untracked_writes = untracked_writes;
	var previous_reaction = active_reaction;
	var previous_skip_reaction = skip_reaction;
	var prev_derived_sources = derived_sources;
	var previous_component_context = component_context;
	var previous_untracking = untracking;
	var flags = reaction.f;
	new_deps = /** @type {null | Value[]} */ null;
	skipped_deps = 0;
	untracked_writes = null;
	skip_reaction =
		(flags & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null);
	active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
	derived_sources = null;
	set_component_context(reaction.ctx);
	untracking = false;
	read_version++;
	try {
		var result =
			/** @type {Function} */
			(0, reaction.fn)();
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
			if (!skip_reaction) {
				for (i = skipped_deps; i < deps.length; i++) {
					((_a = deps[i]).reactions ?? (_a.reactions = [])).push(reaction);
				}
			}
		} else if (deps !== null && skipped_deps < deps.length) {
			remove_reactions(reaction, skipped_deps);
			deps.length = skipped_deps;
		}
		if (
			is_runes() &&
			untracked_writes !== null &&
			!untracking &&
			deps !== null &&
			(reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0
		) {
			for (i = 0; i < /** @type {Source[]} */ untracked_writes.length; i++) {
				schedule_possible_effect_self_invalidation(
					untracked_writes[i],
					/** @type {Effect} */
					reaction
				);
			}
		}
		if (previous_reaction !== null) {
			read_version++;
		}
		return result;
	} finally {
		new_deps = previous_deps;
		skipped_deps = previous_skipped_deps;
		untracked_writes = previous_untracked_writes;
		active_reaction = previous_reaction;
		skip_reaction = previous_skip_reaction;
		derived_sources = prev_derived_sources;
		set_component_context(previous_component_context);
		untracking = previous_untracking;
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
	if (
		reactions === null &&
		(dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
		// to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
		// allows us to skip the expensive work of disconnecting and immediately reconnecting it
		(new_deps === null || !new_deps.includes(dependency))
	) {
		set_signal_status(dependency, MAYBE_DIRTY);
		if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
			dependency.f ^= DISCONNECTED;
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
	var flags = effect2.f;
	if ((flags & DESTROYED) !== 0) {
		return;
	}
	set_signal_status(effect2, CLEAN);
	var previous_effect = active_effect;
	var previous_component_context = component_context;
	var was_updating_effect = is_updating_effect;
	active_effect = effect2;
	is_updating_effect = true;
	try {
		if ((flags & BLOCK_EFFECT) !== 0) {
			destroy_block_effect_children(effect2);
		} else {
			destroy_effect_children(effect2);
		}
		execute_effect_teardown(effect2);
		var teardown2 = update_reaction(effect2);
		effect2.teardown = typeof teardown2 === 'function' ? teardown2 : null;
		effect2.wv = write_version;
		var deps = effect2.deps;
		var dep;
		if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && deps !== null);
		if (DEV);
	} catch (error) {
		handle_error(error, effect2, previous_effect, previous_component_context || effect2.ctx);
	} finally {
		is_updating_effect = was_updating_effect;
		active_effect = previous_effect;
	}
}
function infinite_loop_guard() {
	try {
		effect_update_depth_exceeded();
	} catch (error) {
		if (last_scheduled_effect !== null) {
			{
				handle_error(error, last_scheduled_effect, null);
			}
		} else {
			throw error;
		}
	}
}
function flush_queued_root_effects() {
	try {
		var flush_count = 0;
		while (queued_root_effects.length > 0) {
			if (flush_count++ > 1e3) {
				infinite_loop_guard();
			}
			var root_effects = queued_root_effects;
			var length = root_effects.length;
			queued_root_effects = [];
			for (var i = 0; i < length; i++) {
				var root2 = root_effects[i];
				if ((root2.f & CLEAN) === 0) {
					root2.f ^= CLEAN;
				}
				var collected_effects = process_effects(root2);
				flush_queued_effects(collected_effects);
			}
		}
	} finally {
		is_flushing = false;
		last_scheduled_effect = null;
	}
}
function flush_queued_effects(effects) {
	var length = effects.length;
	if (length === 0) return;
	for (var i = 0; i < length; i++) {
		var effect2 = effects[i];
		if ((effect2.f & (DESTROYED | INERT)) === 0) {
			try {
				if (check_dirtiness(effect2)) {
					update_effect(effect2);
					if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
						if (effect2.teardown === null) {
							unlink_effect(effect2);
						} else {
							effect2.fn = null;
						}
					}
				}
			} catch (error) {
				handle_error(error, effect2, null, effect2.ctx);
			}
		}
	}
}
function schedule_effect(signal) {
	if (!is_flushing) {
		is_flushing = true;
		queueMicrotask(flush_queued_root_effects);
	}
	var effect2 = (last_scheduled_effect = signal);
	while (effect2.parent !== null) {
		effect2 = effect2.parent;
		var flags = effect2.f;
		if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
			if ((flags & CLEAN) === 0) return;
			effect2.f ^= CLEAN;
		}
	}
	queued_root_effects.push(effect2);
}
function process_effects(effect2) {
	var effects = [];
	var current_effect = effect2.first;
	main_loop: while (current_effect !== null) {
		var flags = current_effect.f;
		var is_branch = (flags & BRANCH_EFFECT) !== 0;
		var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
		var sibling2 = current_effect.next;
		if (!is_skippable_branch && (flags & INERT) === 0) {
			if ((flags & EFFECT) !== 0) {
				effects.push(current_effect);
			} else if (is_branch) {
				current_effect.f ^= CLEAN;
			} else {
				var previous_active_reaction = active_reaction;
				try {
					active_reaction = current_effect;
					if (check_dirtiness(current_effect)) {
						update_effect(current_effect);
					}
				} catch (error) {
					handle_error(error, current_effect, null, current_effect.ctx);
				} finally {
					active_reaction = previous_active_reaction;
				}
			}
			var child2 = current_effect.first;
			if (child2 !== null) {
				current_effect = child2;
				continue;
			}
		}
		if (sibling2 === null) {
			let parent = current_effect.parent;
			while (parent !== null) {
				if (effect2 === parent) {
					break main_loop;
				}
				var parent_sibling = parent.next;
				if (parent_sibling !== null) {
					current_effect = parent_sibling;
					continue main_loop;
				}
				parent = parent.parent;
			}
		}
		current_effect = sibling2;
	}
	return effects;
}
function flushSync(fn) {
	var result;
	flush_tasks();
	while (queued_root_effects.length > 0) {
		is_flushing = true;
		flush_queued_root_effects();
		flush_tasks();
	}
	return (
		/** @type {T} */
		result
	);
}
function get$1(signal) {
	var flags = signal.f;
	var is_derived = (flags & DERIVED) !== 0;
	if (active_reaction !== null && !untracking) {
		if (derived_sources !== null && derived_sources.includes(signal)) {
			state_unsafe_local_read();
		}
		var deps = active_reaction.deps;
		if (signal.rv < read_version) {
			signal.rv = read_version;
			if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
				skipped_deps++;
			} else if (new_deps === null) {
				new_deps = [signal];
			} else if (!skip_reaction || !new_deps.includes(signal)) {
				new_deps.push(signal);
			}
		}
	} else if (
		is_derived &&
		/** @type {Derived} */
		signal.deps === null &&
		/** @type {Derived} */
		signal.effects === null
	) {
		var derived2 =
			/** @type {Derived} */
			signal;
		var parent = derived2.parent;
		if (parent !== null && (parent.f & UNOWNED) === 0) {
			derived2.f ^= UNOWNED;
		}
	}
	if (is_derived) {
		derived2 = /** @type {Derived} */ signal;
		if (check_dirtiness(derived2)) {
			update_derived(derived2);
		}
	}
	return signal.v;
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
	signal.f = (signal.f & STATUS_MASK) | status;
}
function deep_read_state(value) {
	if (typeof value !== 'object' || !value || value instanceof EventTarget) {
		return;
	}
	if (STATE_SYMBOL in value) {
		deep_read(value);
	} else if (!Array.isArray(value)) {
		for (let key in value) {
			const prop2 = value[key];
			if (typeof prop2 === 'object' && prop2 && STATE_SYMBOL in prop2) {
				deep_read(prop2);
			}
		}
	}
}
function deep_read(value, visited = /* @__PURE__ */ new Set()) {
	if (
		typeof value === 'object' &&
		value !== null && // We don't want to traverse DOM elements
		!(value instanceof EventTarget) &&
		!visited.has(value)
	) {
		visited.add(value);
		if (value instanceof Date) {
			value.getTime();
		}
		for (let key in value) {
			try {
				deep_read(value[key], visited);
			} catch (e) {}
		}
		const proto = get_prototype_of(value);
		if (
			proto !== Object.prototype &&
			proto !== Array.prototype &&
			proto !== Map.prototype &&
			proto !== Set.prototype &&
			proto !== Date.prototype
		) {
			const descriptors = get_descriptors(proto);
			for (let key in descriptors) {
				const get2 = descriptors[key].get;
				if (get2) {
					try {
						get2.call(value);
					} catch (e) {}
				}
			}
		}
	}
}
function validate_effect(rune) {
	if (active_effect === null && active_reaction === null) {
		effect_orphan();
	}
	if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0 && active_effect === null) {
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
function create_effect(type, fn, sync, push2 = true) {
	var is_root = (type & ROOT_EFFECT) !== 0;
	var parent_effect = active_effect;
	var effect2 = {
		ctx: component_context,
		deps: null,
		nodes_start: null,
		nodes_end: null,
		f: type | DIRTY,
		first: null,
		fn,
		last: null,
		next: null,
		parent: is_root ? null : parent_effect,
		prev: null,
		teardown: null,
		transitions: null,
		wv: 0
	};
	if (sync) {
		try {
			update_effect(effect2);
			effect2.f |= EFFECT_RAN;
		} catch (e) {
			destroy_effect(effect2);
			throw e;
		}
	} else if (fn !== null) {
		schedule_effect(effect2);
	}
	var inert =
		sync &&
		effect2.deps === null &&
		effect2.first === null &&
		effect2.nodes_start === null &&
		effect2.teardown === null &&
		(effect2.f & (EFFECT_HAS_DERIVED | BOUNDARY_EFFECT)) === 0;
	if (!inert && !is_root && push2) {
		if (parent_effect !== null) {
			push_effect(effect2, parent_effect);
		}
		if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
			var derived2 =
				/** @type {Derived} */
				active_reaction;
			(derived2.effects ?? (derived2.effects = [])).push(effect2);
		}
	}
	return effect2;
}
function teardown(fn) {
	const effect2 = create_effect(RENDER_EFFECT, null, false);
	set_signal_status(effect2, CLEAN);
	effect2.teardown = fn;
	return effect2;
}
function user_effect(fn) {
	validate_effect();
	var defer =
		active_effect !== null &&
		(active_effect.f & BRANCH_EFFECT) !== 0 &&
		component_context !== null &&
		!component_context.m;
	if (defer) {
		var context =
			/** @type {ComponentContext} */
			component_context;
		(context.e ?? (context.e = [])).push({
			fn,
			effect: active_effect,
			reaction: active_reaction
		});
	} else {
		var signal = effect(fn);
		return signal;
	}
}
function user_pre_effect(fn) {
	validate_effect();
	return render_effect(fn);
}
function effect_root(fn) {
	const effect2 = create_effect(ROOT_EFFECT, fn, true);
	return () => {
		destroy_effect(effect2);
	};
}
function component_root(fn) {
	const effect2 = create_effect(ROOT_EFFECT, fn, true);
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
function legacy_pre_effect(deps, fn) {
	var context =
		/** @type {ComponentContextLegacy} */
		component_context;
	var token = { effect: null, ran: false };
	context.l.r1.push(token);
	token.effect = render_effect(() => {
		deps();
		if (token.ran) return;
		token.ran = true;
		set(context.l.r2, true);
		untrack(fn);
	});
}
function legacy_pre_effect_reset() {
	var context =
		/** @type {ComponentContextLegacy} */
		component_context;
	render_effect(() => {
		if (!get$1(context.l.r2)) return;
		for (var token of context.l.r1) {
			var effect2 = token.effect;
			if ((effect2.f & CLEAN) !== 0) {
				set_signal_status(effect2, MAYBE_DIRTY);
			}
			if (check_dirtiness(effect2)) {
				update_effect(effect2);
			}
			token.ran = false;
		}
		context.l.r2.v = false;
	});
}
function render_effect(fn) {
	return create_effect(RENDER_EFFECT, fn, true);
}
function template_effect(fn, thunks = [], d = derived$1) {
	const deriveds = thunks.map(d);
	const effect2 = () => fn(...deriveds.map(get$1));
	return block(effect2);
}
function block(fn, flags = 0) {
	return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
}
function branch(fn, push2 = true) {
	return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
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
		var next = effect2.next;
		destroy_effect(effect2, remove_dom);
		effect2 = next;
	}
}
function destroy_block_effect_children(signal) {
	var effect2 = signal.first;
	while (effect2 !== null) {
		var next = effect2.next;
		if ((effect2.f & BRANCH_EFFECT) === 0) {
			destroy_effect(effect2);
		}
		effect2 = next;
	}
}
function destroy_effect(effect2, remove_dom = true) {
	var removed = false;
	if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null) {
		var node = effect2.nodes_start;
		var end = effect2.nodes_end;
		while (node !== null) {
			var next =
				node === end
					? null
					: /** @type {TemplateNode} */
						/* @__PURE__ */ get_next_sibling(node);
			node.remove();
			node = next;
		}
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
	effect2.next =
		effect2.prev =
		effect2.teardown =
		effect2.ctx =
		effect2.deps =
		effect2.fn =
		effect2.nodes_start =
		effect2.nodes_end =
			null;
}
function unlink_effect(effect2) {
	var parent = effect2.parent;
	var prev = effect2.prev;
	var next = effect2.next;
	if (prev !== null) prev.next = next;
	if (next !== null) next.prev = prev;
	if (parent !== null) {
		if (parent.first === effect2) parent.first = next;
		if (parent.last === effect2) parent.last = prev;
	}
}
function pause_effect(effect2, callback) {
	var transitions = [];
	pause_children(effect2, transitions, true);
	run_out_transitions(transitions, () => {
		destroy_effect(effect2);
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
		var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
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
		effect2.f ^= CLEAN;
	}
	if (check_dirtiness(effect2)) {
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
function lifecycle_outside_component(name) {
	{
		throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
	}
}
let component_context = null;
function set_component_context(context) {
	component_context = context;
}
function getContext(key) {
	const context_map = get_or_init_context_map();
	const result =
		/** @type {T} */
		context_map.get(key);
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
		c: null,
		e: null,
		m: false,
		s: props,
		x: null,
		l: null
	};
	if (legacy_mode_flag && !runes) {
		component_context.l = {
			s: null,
			u: null,
			r1: [],
			r2: source(false)
		};
	}
}
function pop(component2) {
	const context_stack_item = component_context;
	if (context_stack_item !== null) {
		if (component2 !== void 0) {
			context_stack_item.x = component2;
		}
		const component_effects = context_stack_item.e;
		if (component_effects !== null) {
			var previous_effect = active_effect;
			var previous_reaction = active_reaction;
			context_stack_item.e = null;
			try {
				for (var i = 0; i < component_effects.length; i++) {
					var component_effect = component_effects[i];
					set_active_effect(component_effect.effect);
					set_active_reaction(component_effect.reaction);
					effect(component_effect.fn);
				}
			} finally {
				set_active_effect(previous_effect);
				set_active_reaction(previous_reaction);
			}
		}
		component_context = context_stack_item.p;
		context_stack_item.m = true;
	}
	return component2 || /** @type {T} */ {};
}
function is_runes() {
	return !legacy_mode_flag || (component_context !== null && component_context.l === null);
}
function get_or_init_context_map(name) {
	if (component_context === null) {
		lifecycle_outside_component();
	}
	return (
		component_context.c ??
		(component_context.c = new Map(get_parent_context(component_context) || void 0))
	);
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
const PASSIVE_EVENTS = ['touchstart', 'touchmove'];
function is_passive_event(name) {
	return PASSIVE_EVENTS.includes(name);
}
function listen(target, events, handler, call_handler_immediately = true) {
	if (call_handler_immediately) {
		handler();
	}
	for (var name of events) {
		target.addEventListener(name, handler);
	}
	teardown(() => {
		for (var name2 of events) {
			target.removeEventListener(name2, handler);
		}
	});
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
	if (
		event_name.startsWith('pointer') ||
		event_name.startsWith('touch') ||
		event_name === 'wheel'
	) {
		queue_micro_task(() => {
			dom.addEventListener(event_name, target_handler, options);
		});
	} else {
		dom.addEventListener(event_name, target_handler, options);
	}
	return target_handler;
}
function event(event_name, dom, handler, capture, passive) {
	var options = { capture, passive };
	var target_handler = create_event(event_name, dom, handler, options);
	if (dom === document.body || dom === window || dom === document) {
		teardown(() => {
			dom.removeEventListener(event_name, target_handler, options);
		});
	}
}
function handle_event_propagation(event2) {
	var _a;
	var handler_element = this;
	var owner_document =
		/** @type {Node} */
		handler_element.ownerDocument;
	var event_name = event2.type;
	var path = ((_a = event2.composedPath) == null ? void 0 : _a.call(event2)) || [];
	var current_target =
		/** @type {null | Element} */
		path[0] || event2.target;
	var path_idx = 0;
	var handled_at = event2.__root;
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (
			at_idx !== -1 &&
			(handler_element === document || handler_element === /** @type {any} */ window)
		) {
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
	current_target = /** @type {Element} */ path[path_idx] || event2.target;
	if (current_target === handler_element) return;
	define_property(event2, 'currentTarget', {
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
			var parent_element =
				current_target.assignedSlot ||
				current_target.parentNode ||
				/** @type {any} */
				current_target.host ||
				null;
			try {
				var delegated = current_target['__' + event_name];
				if (
					delegated !== void 0 &&
					(!(/** @type {any} */ current_target.disabled) || // DOM could've been updated already by the time this is reached, so we check this as well
						// -> the target could not have been disabled because it emits the event in the first place
						event2.target === current_target)
				) {
					if (is_array(delegated)) {
						var [fn, ...data] = delegated;
						fn.apply(current_target, [event2, ...data]);
					} else {
						delegated.call(current_target, event2);
					}
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
let head_anchor;
function reset_head_anchor() {
	head_anchor = void 0;
}
function head(render_fn) {
	let previous_hydrate_node = null;
	let was_hydrating = hydrating;
	var anchor;
	if (hydrating) {
		previous_hydrate_node = hydrate_node;
		if (head_anchor === void 0) {
			head_anchor = /** @type {TemplateNode} */ /* @__PURE__ */ get_first_child(document.head);
		}
		while (
			head_anchor !== null &&
			(head_anchor.nodeType !== 8 || /** @type {Comment} */ head_anchor.data !== HYDRATION_START)
		) {
			head_anchor = /** @type {TemplateNode} */ /* @__PURE__ */ get_next_sibling(head_anchor);
		}
		if (head_anchor === null) {
			set_hydrating(false);
		} else {
			head_anchor = set_hydrate_node(
				/** @type {TemplateNode} */
				/* @__PURE__ */ get_next_sibling(head_anchor)
			);
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
			head_anchor = hydrate_node;
			set_hydrate_node(
				/** @type {TemplateNode} */
				previous_hydrate_node
			);
		}
	}
}
function create_fragment_from_html(html) {
	var elem = document.createElement('template');
	elem.innerHTML = html;
	return elem.content;
}
function assign_nodes(start, end) {
	var effect2 =
		/** @type {Effect} */
		active_effect;
	if (effect2.nodes_start === null) {
		effect2.nodes_start = start;
		effect2.nodes_end = end;
	}
}
// @__NO_SIDE_EFFECTS__
function template(content, flags) {
	var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
	var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
	var node;
	var has_start = !content.startsWith('<!>');
	return () => {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		if (node === void 0) {
			node = create_fragment_from_html(has_start ? content : '<!>' + content);
			if (!is_fragment) node = /** @type {Node} */ /* @__PURE__ */ get_first_child(node);
		}
		var clone =
			/** @type {TemplateNode} */
			use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true);
		if (is_fragment) {
			var start =
				/** @type {TemplateNode} */
				/* @__PURE__ */ get_first_child(clone);
			var end =
				/** @type {TemplateNode} */
				clone.lastChild;
			assign_nodes(start, end);
		} else {
			assign_nodes(clone, clone);
		}
		return clone;
	};
}
function comment() {
	if (hydrating) {
		assign_nodes(hydrate_node, null);
		return hydrate_node;
	}
	var frag = document.createDocumentFragment();
	var start = document.createComment('');
	var anchor = create_text();
	frag.append(start, anchor);
	assign_nodes(start, anchor);
	return frag;
}
function append(anchor, dom) {
	if (hydrating) {
		active_effect.nodes_end = hydrate_node;
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
		var anchor =
			/** @type {TemplateNode} */
			/* @__PURE__ */ get_first_child(target);
		while (
			anchor &&
			(anchor.nodeType !== 8 || /** @type {Comment} */ anchor.data !== HYDRATION_START)
		) {
			anchor = /** @type {TemplateNode} */ /* @__PURE__ */ get_next_sibling(anchor);
		}
		if (!anchor) {
			throw HYDRATION_ERROR;
		}
		set_hydrating(true);
		set_hydrate_node(
			/** @type {Comment} */
			anchor
		);
		hydrate_next();
		const instance = _mount(component2, { ...options, anchor });
		if (
			hydrate_node === null ||
			hydrate_node.nodeType !== 8 ||
			/** @type {Comment} */
			hydrate_node.data !== HYDRATION_END
		) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		set_hydrating(false);
		return (
			/**  @type {Exports} */
			instance
		);
	} catch (error) {
		if (error === HYDRATION_ERROR) {
			if (options.recover === false) {
				hydration_failed();
			}
			init_operations();
			clear_text_content(target);
			set_hydrating(false);
			return mount(component2, options);
		}
		throw error;
	} finally {
		set_hydrating(was_hydrating);
		set_hydrate_node(previous_hydrate_node);
		reset_head_anchor();
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
		branch(() => {
			if (context) {
				push({});
				var ctx =
					/** @type {ComponentContext} */
					component_context;
				ctx.c = context;
			}
			if (events) {
				props.$$events = events;
			}
			if (hydrating) {
				assign_nodes(
					/** @type {TemplateNode} */
					anchor_node,
					null
				);
			}
			component2 = Component(anchor_node, props) || {};
			if (hydrating) {
				active_effect.nodes_end = hydrate_node;
			}
			if (context) {
				pop();
			}
		});
		return () => {
			var _a;
			for (var event_name of registered_events) {
				target.removeEventListener(event_name, handle_event_propagation);
				var n =
					/** @type {number} */
					document_listeners.get(event_name);
				if (--n === 0) {
					document.removeEventListener(event_name, handle_event_propagation);
					document_listeners.delete(event_name);
				} else {
					document_listeners.set(event_name, n);
				}
			}
			root_event_handles.delete(event_handle);
			if (anchor_node !== anchor) {
				(_a = anchor_node.parentNode) == null ? void 0 : _a.removeChild(anchor_node);
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
function if_block(node, fn, elseif = false) {
	if (hydrating) {
		hydrate_next();
	}
	var anchor = node;
	var consequent_effect = null;
	var alternate_effect = null;
	var condition = UNINITIALIZED;
	var flags = elseif ? EFFECT_TRANSPARENT : 0;
	var has_branch = false;
	const set_branch = (fn2, flag = true) => {
		has_branch = true;
		update_branch(flag, fn2);
	};
	const update_branch = (new_condition, fn2) => {
		if (condition === (condition = new_condition)) return;
		let mismatch = false;
		if (hydrating) {
			const is_else =
				/** @type {Comment} */
				anchor.data === HYDRATION_START_ELSE;
			if (!!condition === is_else) {
				anchor = remove_nodes();
				set_hydrate_node(anchor);
				set_hydrating(false);
				mismatch = true;
			}
		}
		if (condition) {
			if (consequent_effect) {
				resume_effect(consequent_effect);
			} else if (fn2) {
				consequent_effect = branch(() => fn2(anchor));
			}
			if (alternate_effect) {
				pause_effect(alternate_effect, () => {
					alternate_effect = null;
				});
			}
		} else {
			if (alternate_effect) {
				resume_effect(alternate_effect);
			} else if (fn2) {
				alternate_effect = branch(() => fn2(anchor));
			}
			if (consequent_effect) {
				pause_effect(consequent_effect, () => {
					consequent_effect = null;
				});
			}
		}
		if (mismatch) {
			set_hydrating(true);
		}
	};
	block(() => {
		has_branch = false;
		fn(set_branch);
		if (!has_branch) {
			update_branch(null, null);
		}
	}, flags);
	if (hydrating) {
		anchor = hydrate_node;
	}
}
function index(_, i) {
	return i;
}
function pause_effects(state, items, controlled_anchor, items_map) {
	var transitions = [];
	var length = items.length;
	for (var i = 0; i < length; i++) {
		pause_children(items[i].e, transitions, true);
	}
	var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
	if (is_controlled) {
		var parent_node =
			/** @type {Element} */
			/** @type {Element} */
			controlled_anchor.parentNode;
		clear_text_content(parent_node);
		parent_node.append(
			/** @type {Element} */
			controlled_anchor
		);
		items_map.clear();
		link(state, items[0].prev, items[length - 1].next);
	}
	run_out_transitions(transitions, () => {
		for (var i2 = 0; i2 < length; i2++) {
			var item = items[i2];
			if (!is_controlled) {
				items_map.delete(item.k);
				link(state, item.prev, item.next);
			}
			destroy_effect(item.e, !is_controlled);
		}
	});
}
function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
	var anchor = node;
	var state = { flags, items: /* @__PURE__ */ new Map(), first: null };
	var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;
	if (is_controlled) {
		var parent_node =
			/** @type {Element} */
			node;
		anchor = hydrating
			? set_hydrate_node(
					/** @type {Comment | Text} */
					/* @__PURE__ */ get_first_child(parent_node)
				)
			: parent_node.appendChild(create_text());
	}
	if (hydrating) {
		hydrate_next();
	}
	var fallback = null;
	var was_empty = false;
	var each_array = /* @__PURE__ */ derived_safe_equal(() => {
		var collection = get_collection();
		return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
	});
	block(() => {
		var array = get$1(each_array);
		var length = array.length;
		if (was_empty && length === 0) {
			return;
		}
		was_empty = length === 0;
		let mismatch = false;
		if (hydrating) {
			var is_else =
				/** @type {Comment} */
				anchor.data === HYDRATION_START_ELSE;
			if (is_else !== (length === 0)) {
				anchor = remove_nodes();
				set_hydrate_node(anchor);
				set_hydrating(false);
				mismatch = true;
			}
		}
		if (hydrating) {
			var prev = null;
			var item;
			for (var i = 0; i < length; i++) {
				if (
					hydrate_node.nodeType === 8 &&
					/** @type {Comment} */
					hydrate_node.data === HYDRATION_END
				) {
					anchor = /** @type {Comment} */ hydrate_node;
					mismatch = true;
					set_hydrating(false);
					break;
				}
				var value = array[i];
				var key = get_key(value, i);
				item = create_item(
					hydrate_node,
					state,
					prev,
					null,
					value,
					key,
					i,
					render_fn,
					flags,
					get_collection
				);
				state.items.set(key, item);
				prev = item;
			}
			if (length > 0) {
				set_hydrate_node(remove_nodes());
			}
		}
		if (!hydrating) {
			reconcile(array, state, anchor, render_fn, flags, get_key, get_collection);
		}
		if (fallback_fn !== null) {
			if (length === 0) {
				if (fallback) {
					resume_effect(fallback);
				} else {
					fallback = branch(() => fallback_fn(anchor));
				}
			} else if (fallback !== null) {
				pause_effect(fallback, () => {
					fallback = null;
				});
			}
		}
		if (mismatch) {
			set_hydrating(true);
		}
		get$1(each_array);
	});
	if (hydrating) {
		anchor = hydrate_node;
	}
}
function reconcile(array, state, anchor, render_fn, flags, get_key, get_collection) {
	var _a, _b, _c, _d;
	var is_animated = (flags & EACH_IS_ANIMATED) !== 0;
	var should_update = (flags & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0;
	var length = array.length;
	var items = state.items;
	var first = state.first;
	var current = first;
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
			item = items.get(key);
			if (item !== void 0) {
				(_a = item.a) == null ? void 0 : _a.measure();
				(to_animate ?? (to_animate = /* @__PURE__ */ new Set())).add(item);
			}
		}
	}
	for (i = 0; i < length; i += 1) {
		value = array[i];
		key = get_key(value, i);
		item = items.get(key);
		if (item === void 0) {
			var child_anchor = current
				? /** @type {TemplateNode} */
					current.e.nodes_start
				: anchor;
			prev = create_item(
				child_anchor,
				state,
				prev,
				prev === null ? state.first : prev.next,
				value,
				key,
				i,
				render_fn,
				flags,
				get_collection
			);
			items.set(key, prev);
			matched = [];
			stashed = [];
			current = prev.next;
			continue;
		}
		if (should_update) {
			update_item(item, value, i, flags);
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
					link(state, a.prev, b.next);
					link(state, prev, a);
					link(state, b, start);
					current = start;
					prev = b;
					i -= 1;
					matched = [];
					stashed = [];
				} else {
					seen.delete(item);
					move(item, current, anchor);
					link(state, item.prev, item.next);
					link(state, item, prev === null ? state.first : prev.next);
					link(state, prev, item);
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
			var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
			if (is_animated) {
				for (i = 0; i < destroy_length; i += 1) {
					(_c = to_destroy[i].a) == null ? void 0 : _c.measure();
				}
				for (i = 0; i < destroy_length; i += 1) {
					(_d = to_destroy[i].a) == null ? void 0 : _d.fix();
				}
			}
			pause_effects(state, to_destroy, controlled_anchor, items);
		}
	}
	if (is_animated) {
		queue_micro_task(() => {
			var _a2;
			if (to_animate === void 0) return;
			for (item of to_animate) {
				(_a2 = item.a) == null ? void 0 : _a2.apply();
			}
		});
	}
	active_effect.first = state.first && state.first.e;
	active_effect.last = prev && prev.e;
}
function update_item(item, value, index2, type) {
	if ((type & EACH_ITEM_REACTIVE) !== 0) {
		internal_set(item.v, value);
	}
	if ((type & EACH_INDEX_REACTIVE) !== 0) {
		internal_set(
			/** @type {Value<number>} */
			item.i,
			index2
		);
	} else {
		item.i = index2;
	}
}
function create_item(
	anchor,
	state,
	prev,
	next,
	value,
	key,
	index2,
	render_fn,
	flags,
	get_collection
) {
	var reactive = (flags & EACH_ITEM_REACTIVE) !== 0;
	var mutable = (flags & EACH_ITEM_IMMUTABLE) === 0;
	var v = reactive ? (mutable ? /* @__PURE__ */ mutable_source(value) : source(value)) : value;
	var i = (flags & EACH_INDEX_REACTIVE) === 0 ? index2 : source(index2);
	var item = {
		i,
		v,
		k: key,
		a: null,
		// @ts-expect-error
		e: null,
		prev,
		next
	};
	try {
		item.e = branch(() => render_fn(anchor, v, i, get_collection), hydrating);
		item.e.prev = prev && prev.e;
		item.e.next = next && next.e;
		if (prev === null) {
			state.first = item;
		} else {
			prev.next = item;
			prev.e.next = item.e;
		}
		if (next !== null) {
			next.prev = item;
			next.e.prev = item.e;
		}
		return item;
	} finally {
	}
}
function move(item, next, anchor) {
	var end = item.next
		? /** @type {TemplateNode} */
			item.next.e.nodes_start
		: anchor;
	var dest = next
		? /** @type {TemplateNode} */
			next.e.nodes_start
		: anchor;
	var node =
		/** @type {TemplateNode} */
		item.e.nodes_start;
	while (node !== end) {
		var next_node =
			/** @type {TemplateNode} */
			/* @__PURE__ */ get_next_sibling(node);
		dest.before(node);
		node = next_node;
	}
}
function link(state, prev, next) {
	if (prev === null) {
		state.first = next;
	} else {
		prev.next = next;
		prev.e.next = next && next.e;
	}
	if (next !== null) {
		next.prev = prev;
		next.e.prev = prev && prev.e;
	}
}
function slot(anchor, $$props, name, slot_props, fallback_fn) {
	var _a;
	if (hydrating) {
		hydrate_next();
	}
	var slot_fn = (_a = $$props.$$slots) == null ? void 0 : _a[name];
	var is_interop = false;
	if (slot_fn === true) {
		slot_fn = $$props['children'];
		is_interop = true;
	}
	if (slot_fn === void 0);
	else {
		slot_fn(anchor, is_interop ? () => slot_props : slot_props);
	}
}
function component(node, get_component, render_fn) {
	if (hydrating) {
		hydrate_next();
	}
	var anchor = node;
	var component2;
	var effect2;
	block(() => {
		if (component2 === (component2 = get_component())) return;
		if (effect2) {
			pause_effect(effect2);
			effect2 = null;
		}
		if (component2) {
			effect2 = branch(() => render_fn(anchor, component2));
		}
	}, EFFECT_TRANSPARENT);
	if (hydrating) {
		anchor = hydrate_node;
	}
}
function append_styles(anchor, css) {
	queue_micro_task(() => {
		var root2 = anchor.getRootNode();
		var target =
			/** @type {ShadowRoot} */
			root2.host
				? /** @type {ShadowRoot} */
					root2
				: /** @type {Document} */
					(root2.head ?? /** @type {Document} */ root2.ownerDocument.head);
		if (!target.querySelector('#' + css.hash)) {
			const style = document.createElement('style');
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
			var prev =
				/** @type {any} */
				{};
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
			return () =>
				/** @type {Function} */
				payload.destroy();
		}
	});
}
const whitespace = [...' 	\n\r\f \v\uFEFF'];
function to_class(value, hash, directives) {
	var classname = value == null ? '' : '' + value;
	if (hash) {
		classname = classname ? classname + ' ' + hash : hash;
	}
	if (directives) {
		for (var key in directives) {
			if (directives[key]) {
				classname = classname ? classname + ' ' + key : key;
			} else if (classname.length) {
				var len = key.length;
				var a = 0;
				while ((a = classname.indexOf(key, a)) >= 0) {
					var b = a + len;
					if (
						(a === 0 || whitespace.includes(classname[a - 1])) &&
						(b === classname.length || whitespace.includes(classname[b]))
					) {
						classname = (a === 0 ? '' : classname.substring(0, a)) + classname.substring(b + 1);
					} else {
						a = b;
					}
				}
			}
		}
	}
	return classname === '' ? null : classname;
}
function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
	var prev = dom.__className;
	if (hydrating || prev !== value) {
		var next_class_name = to_class(value, hash, next_classes);
		if (!hydrating || next_class_name !== dom.getAttribute('class')) {
			if (next_class_name == null) {
				dom.removeAttribute('class');
			} else {
				dom.className = next_class_name;
			}
		}
		dom.__className = value;
	} else if (next_classes) {
		prev_classes ?? (prev_classes = {});
		for (var key in next_classes) {
			var is_present = !!next_classes[key];
			if (is_present !== !!prev_classes[key]) {
				dom.classList.toggle(key, is_present);
			}
		}
	}
	return next_classes;
}
function set_attribute(element, attribute, value, skip_warning) {
	var attributes = element.__attributes ?? (element.__attributes = {});
	if (hydrating) {
		attributes[attribute] = element.getAttribute(attribute);
		if (
			attribute === 'src' ||
			attribute === 'srcset' ||
			(attribute === 'href' && element.nodeName === 'LINK')
		) {
			return;
		}
	}
	if (attributes[attribute] === (attributes[attribute] = value)) return;
	if (attribute === 'style' && '__styles' in element) {
		element.__styles = {};
	}
	if (attribute === 'loading') {
		element[LOADING_ATTR_SYMBOL] = value;
	}
	if (value == null) {
		element.removeAttribute(attribute);
	} else if (typeof value !== 'string' && get_setters(element).includes(attribute)) {
		element[attribute] = value;
	} else {
		element.setAttribute(attribute, value);
	}
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(element) {
	var setters = setters_cache.get(element.nodeName);
	if (setters) return setters;
	setters_cache.set(element.nodeName, (setters = []));
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
function set_style(dom, key, value, important) {
	var styles = dom.__styles ?? (dom.__styles = {});
	if (styles[key] === value) {
		return;
	}
	styles[key] = value;
	if (value == null) {
		dom.style.removeProperty(key);
	} else {
		dom.style.setProperty(key, value, '');
	}
}
function is_bound_this(bound_value, element_or_component) {
	return (
		bound_value === element_or_component ||
		(bound_value == null ? void 0 : bound_value[STATE_SYMBOL]) === element_or_component
	);
}
function bind_this(element_or_component = {}, update2, get_value, get_parts) {
	effect(() => {
		var old_parts;
		var parts;
		render_effect(() => {
			old_parts = parts;
			parts = [];
			untrack(() => {
				if (element_or_component !== get_value(...parts)) {
					update2(element_or_component, ...parts);
					if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
						update2(null, ...old_parts);
					}
				}
			});
		});
		return () => {
			queue_micro_task(() => {
				if (parts && is_bound_this(get_value(...parts), element_or_component)) {
					update2(null, ...parts);
				}
			});
		};
	});
	return element_or_component;
}
function bind_window_size(type, set2) {
	listen(window, ['resize'], () => without_reactive_context(() => set2(window[type])));
}
function init(immutable = false) {
	const context =
		/** @type {ComponentContextLegacy} */
		component_context;
	const callbacks = context.l.u;
	if (!callbacks) return;
	let props = () => deep_read_state(context.s);
	if (immutable) {
		let version = 0;
		let prev =
			/** @type {Record<string, any>} */
			{};
		const d = /* @__PURE__ */ derived$1(() => {
			let changed = false;
			const props2 = context.s;
			for (const key in props2) {
				if (props2[key] !== prev[key]) {
					prev[key] = props2[key];
					changed = true;
				}
			}
			if (changed) version++;
			return version;
		});
		props = () => get$1(d);
	}
	if (callbacks.b.length) {
		user_pre_effect(() => {
			observe_all(context, props);
			run_all(callbacks.b);
		});
	}
	user_effect(() => {
		const fns = untrack(() => callbacks.m.map(run));
		return () => {
			for (const fn of fns) {
				if (typeof fn === 'function') {
					fn();
				}
			}
		};
	});
	if (callbacks.a.length) {
		user_effect(() => {
			observe_all(context, props);
			run_all(callbacks.a);
		});
	}
}
function observe_all(context, props) {
	if (context.l.s) {
		for (const signal of context.l.s) get$1(signal);
	}
	props();
}
function bubble_event($$props, event2) {
	var _a;
	var events =
		/** @type {Record<string, Function[] | Function>} */
		(_a = $$props.$$events) == null ? void 0 : _a[event2.type];
	var callbacks = is_array(events) ? events.slice() : events == null ? [] : [events];
	for (var fn of callbacks) {
		fn.call(this, event2);
	}
}
function onMount(fn) {
	if (component_context === null) {
		lifecycle_outside_component();
	}
	if (legacy_mode_flag && component_context.l !== null) {
		init_update_callbacks(component_context).m.push(fn);
	} else {
		user_effect(() => {
			const cleanup = untrack(fn);
			if (typeof cleanup === 'function')
				return (
					/** @type {() => void} */
					cleanup
				);
		});
	}
}
function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, { detail, bubbles, cancelable });
}
function createEventDispatcher() {
	const active_component_context = component_context;
	if (active_component_context === null) {
		lifecycle_outside_component();
	}
	return (type, detail, options) => {
		var _a;
		const events =
			/** @type {Record<string, Function | Function[]>} */
			(_a = active_component_context.s.$$events) == null
				? void 0
				: /** @type {any} */
					_a[type];
		if (events) {
			const callbacks = is_array(events) ? events.slice() : [events];
			const event2 = create_custom_event(
				/** @type {string} */
				type,
				detail,
				options
			);
			for (const fn of callbacks) {
				fn.call(active_component_context.x, event2);
			}
			return !event2.defaultPrevented;
		}
		return true;
	};
}
function init_update_callbacks(context) {
	var l =
		/** @type {ComponentContextLegacy} */
		context.l;
	return l.u ?? (l.u = { a: [], b: [], m: [] });
}
function subscribe_to_store(store, run2, invalidate) {
	if (store == null) {
		run2(void 0);
		if (invalidate) invalidate(void 0);
		return noop;
	}
	const unsub = untrack(() =>
		store.subscribe(
			run2,
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
	function update2(fn) {
		set2(
			fn(
				/** @type {T} */
				value
			)
		);
	}
	function subscribe(run2, invalidate = noop) {
		const subscriber = [run2, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set2, update2) || noop;
		}
		run2(
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
	return { set: set2, update: update2, subscribe };
}
function derived(stores, fn, initial_value) {
	const single = !Array.isArray(stores);
	const stores_array = single ? [stores] : stores;
	if (!stores_array.every(Boolean)) {
		throw new Error('derived() expects stores as input, got a falsy value');
	}
	const auto = fn.length < 2;
	return readable(initial_value, (set2, update2) => {
		let started = false;
		const values = [];
		let pending = 0;
		let cleanup = noop;
		const sync = () => {
			if (pending) {
				return;
			}
			cleanup();
			const result = fn(single ? values[0] : values, set2, update2);
			if (auto) {
				set2(result);
			} else {
				cleanup = typeof result === 'function' ? result : noop;
			}
		};
		const unsubscribers = stores_array.map((store, i) =>
			subscribe_to_store(
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
	subscribe_to_store(store, (_) => (value = _))();
	return value;
}
let is_store_binding = false;
let IS_UNMOUNTED = Symbol();
function store_get(store, store_name, stores) {
	const entry =
		stores[store_name] ??
		(stores[store_name] = {
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
const legacy_rest_props_handler = {
	get(target, key) {
		if (target.exclude.includes(key)) return;
		get$1(target.version);
		return key in target.special ? target.special[key]() : target.props[key];
	},
	set(target, key, value) {
		if (!(key in target.special)) {
			target.special[key] = prop(
				{
					get [key]() {
						return target.props[key];
					}
				},
				/** @type {string} */
				key,
				PROPS_IS_UPDATED
			);
		}
		target.special[key](value);
		update(target.version);
		return true;
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
	deleteProperty(target, key) {
		if (target.exclude.includes(key)) return true;
		target.exclude.push(key);
		update(target.version);
		return true;
	},
	has(target, key) {
		if (target.exclude.includes(key)) return false;
		return key in target.props;
	},
	ownKeys(target) {
		return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
	}
};
function legacy_rest_props(props, exclude) {
	return new Proxy({ props, exclude, special: {}, version: source(0) }, legacy_rest_props_handler);
}
const spread_props_handler = {
	get(target, key) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if (is_function(p)) p = p();
			if (typeof p === 'object' && p !== null && key in p) return p[key];
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
			if (typeof p === 'object' && p !== null && key in p) {
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
			for (const key in p) {
				if (!keys.includes(key)) keys.push(key);
			}
		}
		return keys;
	}
};
function spread_props(...props) {
	return new Proxy({ props }, spread_props_handler);
}
function prop(props, key, flags, fallback) {
	var _a;
	var immutable = (flags & PROPS_IS_IMMUTABLE) !== 0;
	var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
	var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
	var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;
	var is_store_sub = false;
	var prop_value;
	if (bindable) {
		[prop_value, is_store_sub] = capture_store_binding(
			() =>
				/** @type {V} */
				props[key]
		);
	} else {
		prop_value = /** @type {V} */ props[key];
	}
	var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
	var setter =
		(bindable &&
			(((_a = get_descriptor(props, key)) == null ? void 0 : _a.set) ??
				(is_entry_props && key in props && ((v) => (props[key] = v))))) ||
		void 0;
	var fallback_value =
		/** @type {V} */
		fallback;
	var fallback_dirty = true;
	var fallback_used = false;
	var get_fallback = () => {
		fallback_used = true;
		if (fallback_dirty) {
			fallback_dirty = false;
			if (lazy) {
				fallback_value = untrack(
					/** @type {() => V} */
					fallback
				);
			} else {
				fallback_value = /** @type {V} */ fallback;
			}
		}
		return fallback_value;
	};
	if (prop_value === void 0 && fallback !== void 0) {
		if (setter && runes) {
			props_invalid_value();
		}
		prop_value = get_fallback();
		if (setter) setter(prop_value);
	}
	var getter;
	if (runes) {
		getter = () => {
			var value =
				/** @type {V} */
				props[key];
			if (value === void 0) return get_fallback();
			fallback_dirty = true;
			fallback_used = false;
			return value;
		};
	} else {
		var derived_getter = (immutable ? derived$1 : derived_safe_equal)(
			() =>
				/** @type {V} */
				props[key]
		);
		derived_getter.f |= LEGACY_DERIVED_PROP;
		getter = () => {
			var value = get$1(derived_getter);
			if (value !== void 0) fallback_value = /** @type {V} */ void 0;
			return value === void 0 ? fallback_value : value;
		};
	}
	if ((flags & PROPS_IS_UPDATED) === 0) {
		return getter;
	}
	if (setter) {
		var legacy_parent = props.$$legacy;
		return function (value, mutation) {
			if (arguments.length > 0) {
				if (!runes || !mutation || legacy_parent || is_store_sub) {
					setter(mutation ? getter() : value);
				}
				return value;
			} else {
				return getter();
			}
		};
	}
	var from_child = false;
	var inner_current_value = /* @__PURE__ */ mutable_source(prop_value);
	var current_value = /* @__PURE__ */ derived$1(() => {
		var parent_value = getter();
		var child_value = get$1(inner_current_value);
		if (from_child) {
			from_child = false;
			return child_value;
		}
		return (inner_current_value.v = parent_value);
	});
	if (!immutable) current_value.equals = safe_equals;
	return function (value, mutation) {
		if (arguments.length > 0) {
			const new_value = mutation ? get$1(current_value) : runes && bindable ? proxy(value) : value;
			if (!current_value.equals(new_value)) {
				from_child = true;
				set(inner_current_value, new_value);
				if (fallback_used && fallback_value !== void 0) {
					fallback_value = new_value;
				}
				untrack(() => get$1(current_value));
			}
			return value;
		}
		return get$1(current_value);
	};
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
		var _a;
		var sources = /* @__PURE__ */ new Map();
		var add_source = (key, value) => {
			var s = /* @__PURE__ */ mutable_source(value);
			sources.set(key, s);
			return s;
		};
		const props = new Proxy(
			{ ...(options.props || {}), $$events: {} },
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
		__privateSet(
			this,
			_instance,
			(options.hydrate ? hydrate : mount)(options.component, {
				target: options.target,
				anchor: options.anchor,
				props,
				context: options.context,
				intro: options.intro ?? false,
				recover: options.recover
			})
		);
		if (
			!((_a = options == null ? void 0 : options.props) == null ? void 0 : _a.$$host) ||
			options.sync === false
		) {
			flushSync();
		}
		__privateSet(this, _events, props.$$events);
		for (const key of Object.keys(__privateGet(this, _instance))) {
			if (key === '$set' || key === '$destroy' || key === '$on') continue;
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
		__privateGet(this, _instance).$set =
			/** @param {Record<string, any>} next */
			(next) => {
				Object.assign(props, next);
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
if (typeof HTMLElement === 'function') {
	SvelteElement = class extends HTMLElement {
		/**
		 * @param {*} $$componentCtor
		 * @param {*} $$slots
		 * @param {*} use_shadow_dom
		 */
		constructor($$componentCtor, $$slots, use_shadow_dom) {
			super();
			/** The Svelte component constructor */
			__publicField(this, '$$ctor');
			/** Slots */
			__publicField(this, '$$s');
			/** @type {any} The Svelte component instance */
			__publicField(this, '$$c');
			/** Whether or not the custom element is connected */
			__publicField(this, '$$cn', false);
			/** @type {Record<string, any>} Component props data */
			__publicField(this, '$$d', {});
			/** `true` if currently in the process of reflecting component props back to attributes */
			__publicField(this, '$$r', false);
			/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
			__publicField(this, '$$p_d', {});
			/** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
			__publicField(this, '$$l', {});
			/** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
			__publicField(this, '$$l_u', /* @__PURE__ */ new Map());
			/** @type {any} The managed render effect for reflecting attributes */
			__publicField(this, '$$me');
			this.$$ctor = $$componentCtor;
			this.$$s = $$slots;
			if (use_shadow_dom) {
				this.attachShadow({ mode: 'open' });
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
				let create_slot = function (name) {
					return (anchor) => {
						const slot2 = document.createElement('slot');
						if (name !== 'default') slot2.name = name;
						append(anchor, slot2);
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
						if (name === 'default' && !this.$$d.children) {
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
						this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, 'toProp');
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
						var _a;
						this.$$r = true;
						for (const key of object_keys(this.$$c)) {
							if (!((_a = this.$$p_d[key]) == null ? void 0 : _a.reflect)) continue;
							this.$$d[key] = this.$$c[key];
							const attribute_value = get_custom_element_value(
								key,
								this.$$d[key],
								this.$$p_d,
								'toAttribute'
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
			var _a;
			if (this.$$r) return;
			attr = this.$$g_p(attr);
			this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, 'toProp');
			(_a = this.$$c) == null ? void 0 : _a.$set({ [attr]: this.$$d[attr] });
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
			return (
				object_keys(this.$$p_d).find(
					(key) =>
						this.$$p_d[key].attribute === attribute_name ||
						(!this.$$p_d[key].attribute && key.toLowerCase() === attribute_name)
				) || attribute_name
			);
		}
	};
}
function get_custom_element_value(prop2, value, props_definition, transform) {
	var _a;
	const type = (_a = props_definition[prop2]) == null ? void 0 : _a.type;
	value = type === 'Boolean' && typeof value !== 'boolean' ? value != null : value;
	if (!transform || !props_definition[prop2]) {
		return value;
	} else if (transform === 'toAttribute') {
		switch (type) {
			case 'Object':
			case 'Array':
				return value == null ? null : JSON.stringify(value);
			case 'Boolean':
				return value ? '' : null;
			case 'Number':
				return value == null ? null : value;
			default:
				return value;
		}
	} else {
		switch (type) {
			case 'Object':
			case 'Array':
				return value && JSON.parse(value);
			case 'Boolean':
				return value;
			// conversion already handled above
			case 'Number':
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
			node.slot || 'default'
		] = true;
	});
	return result;
}
function create_custom_element(
	Component,
	props_definition,
	slots,
	exports,
	use_shadow_dom,
	extend
) {
	let Class = class extends SvelteElement {
		constructor() {
			super(Component, slots, use_shadow_dom);
			this.$$p_d = props_definition;
		}
		static get observedAttributes() {
			return object_keys(props_definition).map((key) =>
				(props_definition[key].attribute || key).toLowerCase()
			);
		}
	};
	object_keys(props_definition).forEach((prop2) => {
		define_property(Class.prototype, prop2, {
			get() {
				return this.$$c && prop2 in this.$$c ? this.$$c[prop2] : this.$$d[prop2];
			},
			set(value) {
				var _a;
				value = get_custom_element_value(prop2, value, props_definition);
				this.$$d[prop2] = value;
				var component2 = this.$$c;
				if (component2) {
					var setter = (_a = get_descriptor(component2, prop2)) == null ? void 0 : _a.get;
					if (setter) {
						component2[prop2] = value;
					} else {
						component2.$set({ [prop2]: value });
					}
				}
			}
		});
	});
	exports.forEach((property) => {
		define_property(Class.prototype, property, {
			get() {
				var _a;
				return (_a = this.$$c) == null ? void 0 : _a[property];
			}
		});
	});
	Component.element = /** @type {any} */ Class;
	return Class;
}
var ScrollPositions = /* @__PURE__ */ ((ScrollPositions2) => {
	ScrollPositions2['FULL'] = 'FULL';
	ScrollPositions2['ABOVE'] = 'ABOVE';
	ScrollPositions2['BELOW'] = 'BELOW';
	return ScrollPositions2;
})(ScrollPositions || {});
const getScrollingPos = (scrollytellerRef) => {
	const boundingRect = scrollytellerRef.getBoundingClientRect();
	if (boundingRect.bottom - window.innerHeight < 0) {
		return ScrollPositions.BELOW;
	}
	if (boundingRect.top > 0) {
		return ScrollPositions.ABOVE;
	}
	return ScrollPositions.FULL;
};
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
	window.addEventListener('scroll', onScroll, { passive: true });
	const onEndScroll = () => callback(0);
	window.addEventListener('scrollend', onEndScroll, { passive: true });
	return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('scrollend', onEndScroll);
	};
};
const retryUntil = (condition) =>
	new Promise((resolve) =>
		condition() ? resolve(0) : setInterval(() => condition() && resolve(0), 10)
	);
function OnProgressHandler($$anchor, $$props) {
	push($$props, true);
	let onProgress = prop($$props, 'onProgress', 7),
		scrollytellerRef = prop($$props, 'scrollytellerRef', 7);
	const scrollHandler = () => {
		const rootRect = scrollytellerRef().getBoundingClientRect();
		onProgress()('progress', {
			boundingRect: rootRect,
			rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
			scrollPct: 1 - (rootRect.bottom - window.innerHeight) / (rootRect.height - window.innerHeight)
		});
	};
	event('scroll', $window, scrollHandler);
	return pop({
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
	});
}
create_custom_element(OnProgressHandler, { onProgress: {}, scrollytellerRef: {} }, [], [], true);
var root_1$1 = /* @__PURE__ */ template(`<div class="panelobserver-debug svelte-1iywulw"></div>`);
const $$css$4 = {
	hash: 'svelte-1iywulw',
	code: '.panelobserver-debug.svelte-1iywulw {position:sticky;left:0;width:100%;background:rgba(0, 0, 0, 0.1);border:1px solid rgba(0, 255, 47, 0.4);border-style:solid none solid;z-index:0;}'
};
function PanelObserver($$anchor, $$props) {
	push($$props, false);
	append_styles($$anchor, $$css$4);
	const [$$stores, $$cleanup] = setup_stores();
	const $isMobileRowMode = () => store_get(isMobileRowMode, '$isMobileRowMode', $$stores);
	const $vizDims = () => store_get(vizDims, '$vizDims', $$stores);
	const $screenDims = () => store_get(screenDims, '$screenDims', $$stores);
	const $isSplitScreen = () => store_get(isSplitScreen, '$isSplitScreen', $$stores);
	const $steps = () => store_get(steps, '$steps', $$stores);
	const vizMarkerThresholdMarginDecimal = mutable_state();
	const vizDims = getContext('vizDims');
	const isSplitScreen = getContext('isSplitScreen');
	const isMobileRowMode = getContext('isMobileRowMode');
	const screenDims = getContext('screenDims');
	const steps = getContext('steps');
	const currentPanel = getContext('currentPanel');
	let marker = prop($$props, 'marker', 12);
	let observerOptions = prop($$props, 'observerOptions', 12);
	let isDebug = prop($$props, 'isDebug', 12);
	let vizMarkerThreshold = prop($$props, 'vizMarkerThreshold', 12, 20);
	let rootMargin = mutable_state();
	let _observerOptions = mutable_state();
	let panelObserver = mutable_state();
	let intersectingPanels = mutable_state([]);
	onMount(() => {
		var _a;
		return (_a = get$1(panelObserver)) == null ? void 0 : _a.disconnect();
	});
	legacy_pre_effect(
		() => deep_read_state(vizMarkerThreshold()),
		() => {
			set(vizMarkerThresholdMarginDecimal, (100 - vizMarkerThreshold() * 2) / 100);
		}
	);
	legacy_pre_effect(
		() => (
			$isMobileRowMode(),
			$vizDims(),
			$screenDims(),
			$isSplitScreen(),
			get$1(vizMarkerThresholdMarginDecimal)
		),
		() => {
			console.log($isMobileRowMode());
			if ($isMobileRowMode()) {
				const threshold = ($vizDims().dims[1] / $screenDims()[1]) * 100;
				set(rootMargin, `-${threshold}% 0px 0px 0px`);
			} else if ($isSplitScreen()) {
				const threshold = Math.round(
					($screenDims()[1] -
						($vizDims().dims[1] || $screenDims()[1]) * get$1(vizMarkerThresholdMarginDecimal)) /
						2
				);
				set(rootMargin, `-${threshold}px 0px -${threshold}px 0px`);
			} else {
				const threshold = Math.round($screenDims()[1] / 8);
				set(rootMargin, `-${threshold}px 0px -${threshold}px 0px`);
			}
		}
	);
	legacy_pre_effect(
		() => (deep_read_state(observerOptions()), get$1(rootMargin)),
		() => {
			set(_observerOptions, {
				...(observerOptions() || {}),
				rootMargin: get$1(rootMargin)
			});
		}
	);
	legacy_pre_effect(
		() => (
			$vizDims(), get$1(intersectingPanels), get$1(panelObserver), $steps(), get$1(_observerOptions)
		),
		() => {
			var _a, _b;
			if ($vizDims().status === 'ready') {
				set(intersectingPanels, []);
				(_a = get$1(panelObserver)) == null ? void 0 : _a.disconnect();
				set(
					panelObserver,
					new IntersectionObserver((entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								get$1(intersectingPanels).push(entry);
							} else {
								const itemToRemove = get$1(intersectingPanels).findIndex(
									(panel) => panel.target === entry.target
								);
								if (itemToRemove === -1) return;
								get$1(intersectingPanels).splice(itemToRemove, 1);
							}
							const newPanel = get$1(intersectingPanels)[get$1(intersectingPanels).length - 1];
							if (newPanel) {
								marker(newPanel.target.scrollyData);
								store_set(
									currentPanel,
									$steps().findIndex((step) => step === newPanel.target)
								);
							}
						});
					}, get$1(_observerOptions))
				);
				$steps().forEach((step) => {
					get$1(panelObserver).observe(step);
				});
			} else {
				(_b = get$1(panelObserver)) == null ? void 0 : _b.disconnect();
			}
		}
	);
	legacy_pre_effect_reset();
	init();
	var fragment = comment();
	var node = first_child(fragment);
	{
		var consequent = ($$anchor2) => {
			var div = root_1$1();
			template_effect(() => {
				set_style(div, 'top', get$1(rootMargin) + 'px');
				set_style(div, 'height', innerHeight - get$1(rootMargin) * 2 + 'px');
			});
			append($$anchor2, div);
		};
		if_block(node, ($$render) => {
			if (isDebug() && get$1(rootMargin) && !observerOptions()) $$render(consequent);
		});
	}
	append($$anchor, fragment);
	var $$pop = pop({
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
		get isDebug() {
			return isDebug();
		},
		set isDebug($$value) {
			isDebug($$value);
			flushSync();
		},
		get vizMarkerThreshold() {
			return vizMarkerThreshold();
		},
		set vizMarkerThreshold($$value) {
			vizMarkerThreshold($$value);
			flushSync();
		}
	});
	$$cleanup();
	return $$pop;
}
create_custom_element(
	PanelObserver,
	{
		marker: {},
		observerOptions: {},
		isDebug: {},
		vizMarkerThreshold: {}
	},
	[],
	[],
	true
);
function ScreenDimsStoreUpdater($$anchor, $$props) {
	push($$props, false);
	const [$$stores, $$cleanup] = setup_stores();
	const globalAlign = getContext('globalAlign');
	const screenDims = getContext('screenDims');
	const globalMobileVariant = getContext('mobileVariant');
	let align = prop($$props, 'align', 12, 'centre');
	let mobileVariant = prop($$props, 'mobileVariant', 12, 'blocks');
	let innerWidth = mutable_state(0);
	let innerHeight2 = mutable_state(0);
	legacy_pre_effect(
		() => (get$1(innerWidth), get$1(innerHeight2)),
		() => {
			store_set(screenDims, [get$1(innerWidth), get$1(innerHeight2)]);
		}
	);
	legacy_pre_effect(
		() => deep_read_state(align()),
		() => {
			store_set(globalAlign, align());
		}
	);
	legacy_pre_effect(
		() => deep_read_state(mobileVariant()),
		() => {
			store_set(globalMobileVariant, mobileVariant());
		}
	);
	legacy_pre_effect_reset();
	init();
	bind_window_size('innerWidth', ($$value) => set(innerWidth, $$value));
	bind_window_size('innerHeight', ($$value) => set(innerHeight2, $$value));
	var $$pop = pop({
		get align() {
			return align();
		},
		set align($$value) {
			align($$value);
			flushSync();
		},
		get mobileVariant() {
			return mobileVariant();
		},
		set mobileVariant($$value) {
			mobileVariant($$value);
			flushSync();
		}
	});
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
		status: 'loading',
		dims: [0, 0]
	});
}
function setGraphicRootDims() {
	return writable({
		status: 'loading',
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
	return writable('centre');
}
function setMobileVariant() {
	return writable('blocks');
}
const LARGE_TABLET_BREAKPOINT = 992;
function setIsSplitScreen([screenDims, globalAlign]) {
	return derived(
		[screenDims, globalAlign],
		([$screenDims, $globalAlign]) =>
			['left', 'right'].includes($globalAlign) && $screenDims[0] >= LARGE_TABLET_BREAKPOINT
	);
}
function setIsMobileRowMode([screenDims, mobileVariant]) {
	return derived(
		[screenDims, mobileVariant],
		([$screenDims, $mobileVariant]) =>
			$mobileVariant === 'rows' && $screenDims[0] < LARGE_TABLET_BREAKPOINT
	);
}
function setMaxScrollytellerWidth([isSplitScreen]) {
	return derived([isSplitScreen], ([$isSplitScreen]) => ($isSplitScreen ? 2040 : 1e6));
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
		([$isSplitScreen, $graphicRootDims, $screenDims, $ratio, $maxScrollytellerWidth]) => {
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
var root$2 = /* @__PURE__ */ template(`<div><div class="st-panel svelte-j6scue"></div></div>`);
const $$css$3 = {
	hash: 'svelte-j6scue',
	code: '@media (max-width: 62rem) {.scrollyteller--mobile-row-variant .st-panel.svelte-j6scue::before {opacity:0 !important;}\n}.st-panel-root.svelte-j6scue {--panel-radius: 0.75rem;--panel-background: var(--color-panel-background, rgba(255, 255, 255, 0.95));--panel-color: var(--color-panel-text, #000);--panel-opacity: var(--color-panel-opacity, 1);--panel-filter: var(--color-panel-filter, blur(2.5px));--panel-border: var(--color-panel-border, 1px solid rgba(0, 0, 0, 0.15));--panel-padding: 1rem;\n  /* How opaque do we make inactive panels on 2 column mode */--panel-opacity-inactive: var(--color-panel-opacity-inactive, 1);\n  /** How much margin should we have between panels on 2 column mode */--panel-column-margin: var(--color-panel-margin, 40vh);box-sizing:border-box;margin:80vh auto;position:relative;z-index:1;pointer-events:none;}\n@media (min-width: 46.5rem) {.st-panel-root.svelte-j6scue {--panel-padding: 2rem;}\n}[data-scheme="dark"] .st-panel-root.svelte-j6scue, .is-dark-mode .st-panel-root.svelte-j6scue {--panel-background: var(--color-panel-background, rgba(15, 15, 15, 0.95));--panel-color: var(--color-panel-text, #ebebeb);--panel-border: var(--color-panel-border, 1px solid rgba(255, 255, 255, 0.15));}.scrollyteller--debug .st-panel-root.svelte-j6scue {outline:5px solid limegreen;}.st-panel-root.first.svelte-j6scue {margin-top:100dvh;}.st-panel-root.last.svelte-j6scue {margin-bottom:50vh;}\n@media (min-width: 62rem) {.st-panel-root--left.svelte-j6scue, .st-panel-root--right.svelte-j6scue {margin-top:var(--panel-column-margin);margin-bottom:var(--panel-column-margin);opacity:1;}.st-panel-root--left.st-panel-root--transparent-blocks.st-panel-root--active.svelte-j6scue, .st-panel-root--right.st-panel-root--transparent-blocks.st-panel-root--active.svelte-j6scue {opacity:1;}.st-panel-root--left.st-panel-root--transparent-blocks.svelte-j6scue, .st-panel-root--right.st-panel-root--transparent-blocks.svelte-j6scue {--panel-filter: none;--panel-background: none;--panel-border: none;--panel-padding: 0;opacity:var(--panel-opacity-inactive);}.st-panel-root--left.first.svelte-j6scue, .st-panel-root--right.first.svelte-j6scue {margin-top:50dvh;}\n}.st-panel.svelte-j6scue {-webkit-backdrop-filter:var(--panel-filter);backdrop-filter:var(--panel-filter);color:var(--panel-color);border-radius:var(--panel-radius);padding:var(--panel-padding);}.st-panel.svelte-j6scue::before {content:"";background-color:var(--panel-background);opacity:var(--panel-opacity);border-radius:var(--panel-radius);border:var(--panel-border);position:absolute;z-index:-1;top:0;left:0;width:100%;height:100%;}.st-panel.svelte-j6scue::after {content:"";display:table;clear:both;}.st-panel.svelte-j6scue > * {pointer-events:all;color:var(--panel-color);margin-top:0;margin-left:auto !important;margin-right:auto !important;}.st-panel.svelte-j6scue > *:last-child {margin-bottom:0;}.st-panel.svelte-j6scue > :is(div, p) {font-family:ABCSans, sans-serif;font-size:inherit;line-height:1.666666667;}.st-panel.svelte-j6scue > img {max-width:66%;display:block;margin:auto;height:auto;}.st-panel.svelte-j6scue > :is(h1, h2, h3, h4) {font-family:var(--od-font-stack-serif);}'
};
function Panel($$anchor, $$props) {
	push($$props, false);
	append_styles($$anchor, $$css$3);
	const [$$stores, $$cleanup] = setup_stores();
	const $steps = () => store_get(steps, '$steps', $$stores);
	const $currentPanel = () => store_get(currentPanel, '$currentPanel', $$stores);
	const currentPanel = getContext('currentPanel');
	const steps = getContext('steps');
	let align = prop($$props, 'align', 12);
	let transparentFloat = prop($$props, 'transparentFloat', 12);
	let panelClass = prop($$props, 'panelClass', 12);
	let data = prop($$props, 'data', 12);
	let nodes = prop($$props, 'nodes', 12);
	let i = prop($$props, 'i', 28, () => -1);
	let panelRef = mutable_state();
	onMount(() => {
		mutate(panelRef, (get$1(panelRef).scrollyData = data()));
		store_set(steps, [...$steps(), get$1(panelRef)]);
	});
	init();
	var div = root$2();
	let classes;
	var div_1 = child(div);
	action(
		div_1,
		($$node, $$action_arg) => (children == null ? void 0 : children($$node, $$action_arg)),
		nodes
	);
	reset(div);
	bind_this(
		div,
		($$value) => set(panelRef, $$value),
		() => get$1(panelRef)
	);
	template_effect(() => {
		set_attribute(div, 'data-align', align());
		set_attribute(div, 'data-index', i());
		classes = set_class(div, 1, `st-panel-root ${panelClass() || ''}`, 'svelte-j6scue', classes, {
			'st-panel-root--left': align() === 'left',
			'st-panel-root--right': align() === 'right',
			'st-panel-root--centre': align() === 'centre',
			'st-panel-root--transparent-blocks': transparentFloat(),
			'st-panel-root--active': i() === $currentPanel()
		});
	});
	append($$anchor, div);
	var $$pop = pop({
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
		set i($$value) {
			i($$value);
			flushSync();
		}
	});
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
var root_1 = /* @__PURE__ */ template(`<div class="panel-wrapper"><div></div></div>`);
const $$css$2 = {
	hash: 'svelte-csaqt1',
	code: '/* :global(.scrollyteller--mobile-row-variant) { */\n/*   .content { */\n/*     position: fixed; */\n/*   } */\n/* } */.content.svelte-csaqt1 {margin:-100dvh auto 0;padding-bottom:1px;position:relative;z-index:2;pointer-events:none;font-size:1.125rem;}\n\n@media (min-width: 62rem) {.content--centre.svelte-csaqt1 {max-width:48.75rem;}\n}\n@media (min-width: 90rem) {.content--centre.svelte-csaqt1 {max-width:56.25rem;}\n}.content--left.svelte-csaqt1, .content--right.svelte-csaqt1 {max-width:127.5rem;margin-left:0;}\n@media (min-width: 62rem) {.content--left.svelte-csaqt1, .content--right.svelte-csaqt1 {max-width:40rem;margin-right:calc(var(--rightColumnWidth, 100px) + var(--marginOuter) * 1);font-size:1.125rem;}\n}\n@media (min-width: 75rem) {.content--left.svelte-csaqt1, .content--right.svelte-csaqt1 {font-size:1.125rem;}\n}\n@media (min-width: 90rem) {.content--left.svelte-csaqt1, .content--right.svelte-csaqt1 {max-width:45rem;font-size:1.25rem;}\n}.content--right.svelte-csaqt1 {margin-right:0;margin-left:calc(var(--rightColumnWidth, 100px) + var(--marginOuter) * 1);}'
};
function Panels($$anchor, $$props) {
	push($$props, false);
	append_styles($$anchor, $$css$2);
	let panelRoot = prop($$props, 'panelRoot', 12);
	let layout = prop($$props, 'layout', 12);
	let panels = prop($$props, 'panels', 12);
	let customPanel = prop($$props, 'customPanel', 12, null);
	let steps = prop($$props, 'steps', 28, () => []);
	let panelGroups = mutable_state([]);
	legacy_pre_effect(
		() => (get$1(panelGroups), deep_read_state(panels()), deep_read_state(layout())),
		() => {
			set(panelGroups, []);
			let group;
			panels().forEach(({ align = layout().align, panelClass = '', ...panel }, i) => {
				if (align !== (group == null ? void 0 : group.align)) {
					group && get$1(panelGroups).push(group);
					group = { align, panels: [] };
				}
				if (i === 0) panelClass += ' first';
				if (i === panels().length - 1) panelClass += ' last';
				group.panels.push({ ...panel, panelClass, i });
			});
			get$1(panelGroups).push(group);
		}
	);
	legacy_pre_effect_reset();
	init();
	var fragment = comment();
	var node = first_child(fragment);
	each(
		node,
		1,
		() => get$1(panelGroups),
		index,
		($$anchor2, group) => {
			var div = root_1();
			var div_1 = child(div);
			let classes;
			each(
				div_1,
				5,
				() => get$1(group).panels,
				index,
				($$anchor3, panel) => {
					var fragment_1 = comment();
					var node_1 = first_child(fragment_1);
					{
						var consequent = ($$anchor4) => {
							var fragment_2 = comment();
							var node_2 = first_child(fragment_2);
							component(node_2, customPanel, ($$anchor5, $$component) => {
								$$component(
									$$anchor5,
									spread_props(() => get$1(panel), {
										get steps() {
											return steps();
										}
									})
								);
							});
							append($$anchor4, fragment_2);
						};
						var alternate = ($$anchor4) => {
							const expression = /* @__PURE__ */ derived_safe_equal(
								() => get$1(panel).align || layout().align
							);
							Panel(
								$$anchor4,
								spread_props(() => get$1(panel), {
									get align() {
										return get$1(expression);
									},
									get transparentFloat() {
										return layout().transparentFloat;
									},
									get steps() {
										return steps();
									}
								})
							);
						};
						if_block(node_1, ($$render) => {
							if (customPanel()) $$render(consequent);
							else $$render(alternate, false);
						});
					}
					append($$anchor3, fragment_1);
				}
			);
			reset(div_1);
			reset(div);
			bind_this(
				div,
				($$value) => panelRoot($$value),
				() => panelRoot()
			);
			template_effect(
				() =>
					(classes = set_class(div_1, 1, 'content svelte-csaqt1', null, classes, {
						'content--centre': get$1(group).align === 'centre',
						'content--right': get$1(group).align === 'right',
						'content--left': get$1(group).align === 'left'
					}))
			);
			append($$anchor2, div);
		}
	);
	append($$anchor, fragment);
	return pop({
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
		set customPanel($$value) {
			customPanel($$value);
			flushSync();
		},
		get steps() {
			return steps();
		},
		set steps($$value) {
			steps($$value);
			flushSync();
		}
	});
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
	push($$props, false);
	const [$$stores, $$cleanup] = setup_stores();
	let graphicRootEl = prop($$props, 'graphicRootEl', 12);
	const vizDims = getContext('vizDims');
	const graphicRootDims = getContext('graphicRootDims');
	getContext('maxGraphicWidth');
	onMount(() => {
		let observer;
		observer = new ResizeObserver((entries) => {
			requestAnimationFrame(() => {
				entries.forEach((entry) => {
					if (entry.target === graphicRootEl()) {
						store_set(graphicRootDims, {
							status: 'ready',
							dims: [entry.contentRect.width, entry.contentRect.height]
						});
					} else {
						store_set(vizDims, {
							status: 'ready',
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
			var _a, _b;
			return (_b = (_a = graphicRootEl()) == null ? void 0 : _a.children) == null
				? void 0
				: _b.length;
		}).then(() => {
			const child2 = graphicRootEl().children[0];
			observer.observe(child2);
		});
		return () => {
			observer == null ? void 0 : observer.disconnect();
		};
	});
	init();
	var $$pop = pop({
		get graphicRootEl() {
			return graphicRootEl();
		},
		set graphicRootEl($$value) {
			graphicRootEl($$value);
			flushSync();
		}
	});
	$$cleanup();
	return $$pop;
}
create_custom_element(GraphicObserver, { graphicRootEl: {} }, [], [], true);
var root$1 = /* @__PURE__ */ template(`<!> <div><!></div>`, 1);
const $$css$1 = {
	hash: 'svelte-1ozogkt',
	code: '.scrollyteller--mobile-row-variant {--marginOuter: 0;--vizMarginOuter: 0;}\n@media (max-width: 62rem) {.scrollyteller--mobile-row-variant .viz--resized.svelte-1ozogkt {z-index:10;top:0;background:white;margin:0;height:40dvh;}\n}.viz.svelte-1ozogkt {transform:translate3d(0, 0, 0);height:100dvh;position:sticky;top:0;left:0;z-index:1;}.viz--resized.svelte-1ozogkt {container-type:size;height:60dvh;top:10dvh;display:flex;justify-content:center;align-items:flex-start;margin:0 auto;margin:0 auto;width:calc(100% - var(--marginOuter) * 2);max-width:calc(100vw - var(--vizMarginOuter) * 2);}\n@media (min-width: 46.5rem) {.viz--resized.svelte-1ozogkt {--margin: 4rem;top:8dvh;height:62dvh;}\n}.viz--resized.viz--left.svelte-1ozogkt, .viz--resized.viz--right.svelte-1ozogkt {width:var(--rightColumnWidth);}\n@media (min-width: 62rem) {.viz--resized.viz--left.svelte-1ozogkt, .viz--resized.viz--right.svelte-1ozogkt {align-items:center;height:84dvh;top:8dvh;}\n}\n@media (min-width: 75rem) {.viz--resized.viz--left.svelte-1ozogkt, .viz--resized.viz--right.svelte-1ozogkt {height:76dvh;top:12dvh;}\n}\n@media (min-width: 90rem) {.viz--resized.viz--left.svelte-1ozogkt, .viz--resized.viz--right.svelte-1ozogkt {top:10dvh;height:80dvh;}\n}\n@media (min-width: 62rem) {.viz--resized.viz--left.svelte-1ozogkt {margin:0 auto 0 0;}\n}\n@media (min-width: 62rem) {.viz--resized.viz--right.svelte-1ozogkt {margin:0 0 0 auto;}\n}\n@media (min-width: 62rem) {.viz--resized.viz--centre.svelte-1ozogkt {top:8dvh;height:62dvh;}\n}\n@media (min-width: 75rem) {.viz--resized.viz--centre.svelte-1ozogkt {top:12dvh;height:58dvh;}\n}\n@media (min-width: 90rem) {.viz--resized.viz--centre.svelte-1ozogkt {top:12dvh;height:58dvh;}\n}.scrollyteller--debug .viz--resized.svelte-1ozogkt {outline:5px solid limegreen;}'
};
function Viz($$anchor, $$props) {
	push($$props, false);
	append_styles($$anchor, $$css$1);
	let layout = prop($$props, 'layout', 12);
	let discardSlot = prop($$props, 'discardSlot', 12, false);
	let isInViewport = prop($$props, 'isInViewport', 12, false);
	let onLoad = prop($$props, 'onLoad', 12, () => {});
	createEventDispatcher();
	let graphicRootEl = mutable_state();
	legacy_pre_effect(
		() => (get$1(graphicRootEl), deep_read_state(onLoad())),
		() => {
			if (get$1(graphicRootEl)) {
				onLoad()(get$1(graphicRootEl));
			}
		}
	);
	legacy_pre_effect_reset();
	init();
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
			slot(node_2, $$props, 'default', {});
			append($$anchor2, fragment_1);
		};
		if_block(node_1, ($$render) => {
			if (isInViewport() || discardSlot() === false) $$render(consequent);
		});
	}
	reset(div);
	bind_this(
		div,
		($$value) => set(graphicRootEl, $$value),
		() => get$1(graphicRootEl)
	);
	template_effect(
		() =>
			(classes = set_class(div, 1, 'viz svelte-1ozogkt', null, classes, {
				'viz--resized': layout().resizeInteractive,
				'viz--right': layout().resizeInteractive && layout().align === 'left',
				'viz--left': layout().resizeInteractive && layout().align === 'right',
				'viz--centre': layout().resizeInteractive && layout().align === 'centre'
			}))
	);
	append($$anchor, fragment);
	return pop({
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
		set discardSlot($$value) {
			discardSlot($$value);
			flushSync();
		},
		get isInViewport() {
			return isInViewport();
		},
		set isInViewport($$value) {
			isInViewport($$value);
			flushSync();
		},
		get onLoad() {
			return onLoad();
		},
		set onLoad($$value) {
			onLoad($$value);
			flushSync();
		}
	});
}
create_custom_element(
	Viz,
	{
		layout: {},
		discardSlot: {},
		isInViewport: {},
		onLoad: {}
	},
	['default'],
	[],
	true
);
var root_2 = /* @__PURE__ */ template(`<style>/* styles required to make position sticky work */
			/* existing styles on an Odyssey body are preventing position sticky from 'sticking' */
			body {
				overflow: visible;
			}</style>`);
var root = /* @__PURE__ */ template(
	`<!> <!> <!> <div class="scrollyteller-wrapper svelte-unolp6"><!> <div><!> <!></div></div>`,
	1
);
const $$css = {
	hash: 'svelte-unolp6',
	code: '.scrollyteller-wrapper.svelte-unolp6 {position:relative;}.scrollyteller.svelte-unolp6 {position:relative;--maxScrollytellerWidth: min(var(--maxScrollytellerWidthPx), 100vw);--marginOuter: 1rem;margin:0 auto;max-width:calc(var(--maxScrollytellerWidth) - var(--marginOuter) * 2);--vizMaxWidth: 1;--vizMarginOuter: 1.5rem;\n  /* Force full width when using the mobile row variant */}\n@media (max-width: 62rem) {.scrollyteller.scrollyteller--mobile-row-variant.svelte-unolp6 {--marginOuter: 0;--vizMarginOuter: 0;}\n}\n@media (min-width: 46.5rem) {.scrollyteller.svelte-unolp6 {--marginOuter: 2rem;--vizMarginOuter: 3rem;}\n}\n@media (min-width: 62rem) {.scrollyteller.svelte-unolp6 {--marginOuter: 2rem;--vizMarginOuter: 3rem;--vizMaxWidth: 0.55;}.scrollyteller--columns.svelte-unolp6 {width:fit-content;}\n}\n@media (min-width: 75rem) {.scrollyteller.svelte-unolp6 {--marginOuter: 3rem;--vizMarginOuter: 4rem;--vizMaxWidth: 0.7;}\n}\n@media (min-width: 90rem) {.scrollyteller.svelte-unolp6 {--marginOuter: 4rem;--vizMarginOuter: 6rem;}\n}.scrollyteller--debug.svelte-unolp6:after {content:"Mobile";position:fixed;right:0.5rem;top:0.5rem;padding:0.5rem 1rem;background:white;color:black;border:5px solid limegreen;border-radius:1rem;z-index:110;}\n@media (min-width: 46.5rem) {.scrollyteller--debug.svelte-unolp6:after {content:"Tablet";}\n}\n@media (min-width: 62rem) {.scrollyteller--debug.svelte-unolp6:after {content:"LargeTablet";}\n}\n@media (min-width: 75rem) {.scrollyteller--debug.svelte-unolp6:after {content:"Desktop";}\n}\n@media (min-width: 90rem) {.scrollyteller--debug.svelte-unolp6:after {content:"LargeDesktop";}\n}'
};
function Scrollyteller($$anchor, $$props) {
	push($$props, false);
	append_styles($$anchor, $$css);
	const [$$stores, $$cleanup] = setup_stores();
	const $maxScrollytellerWidthStore = () =>
		store_get(maxScrollytellerWidthStore, '$maxScrollytellerWidthStore', $$stores);
	const $maxGraphicWidthStore = () =>
		store_get(maxGraphicWidthStore, '$maxGraphicWidthStore', $$stores);
	const _layout = mutable_state();
	const _observerOptions = mutable_state();
	const maxScrollSpeed = mutable_state();
	const isDebug = mutable_state();
	createEventDispatcher();
	setContext('steps', setSteps());
	setContext('margin', setMargin());
	setContext('vizDims', setVizDims());
	const graphicRootDimsStore = setContext('graphicRootDims', setGraphicRootDims());
	const ratioStore = setContext('ratio', setRatio());
	const screenDimsStore = setContext('screenDims', setScreenDims());
	const globalAlignStore = setContext('globalAlign', setGlobalAlign());
	const mobileVariantStore = setContext('mobileVariant', setMobileVariant());
	const isSplitScreenStore = setContext(
		'isSplitScreen',
		setIsSplitScreen([screenDimsStore, globalAlignStore])
	);
	setContext('isMobileRowMode', setIsMobileRowMode([screenDimsStore, mobileVariantStore]));
	const maxScrollytellerWidthStore = setContext(
		'maxScrollytellerWidth',
		setMaxScrollytellerWidth([isSplitScreenStore])
	);
	const maxGraphicWidthStore = setContext(
		'maxGraphicWidth',
		setMaxGraphicWidth([
			isSplitScreenStore,
			graphicRootDimsStore,
			screenDimsStore,
			ratioStore,
			maxScrollytellerWidthStore
		])
	);
	setContext('currentPanel', setCurrentPanel());
	let customPanel = prop($$props, 'customPanel', 12, null);
	let panels = prop($$props, 'panels', 12);
	let onProgress = prop($$props, 'onProgress', 12, () => {});
	let onMarker = prop($$props, 'onMarker', 12, () => {});
	let onLoad = prop($$props, 'onLoad', 12, () => {});
	let observerOptions = prop($$props, 'observerOptions', 12, void 0);
	let discardSlot = prop($$props, 'discardSlot', 12, false);
	let layout = prop($$props, 'layout', 28, () => ({}));
	let ratio = prop($$props, 'ratio', 12, 1);
	let vizMarkerThreshold = prop($$props, 'vizMarkerThreshold', 12, 20);
	const isOdyssey = window.__IS_ODYSSEY_FORMAT__;
	let scrollytellerRef = mutable_state();
	let marker = mutable_state();
	let scrollingPos;
	let isInViewport = mutable_state(false);
	let scrollSpeed = 0;
	let deferUntilScrollSettlesActions = [];
	let panelRoot = mutable_state();
	const scrollytellerObserver = new IntersectionObserver(([scrollytellerEntry]) =>
		deferUntilScrollSettles(() => {
			set(isInViewport, scrollytellerEntry.isIntersecting);
		})
	);
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
		scrollingPos = getScrollingPos(get$1(scrollytellerRef));
		if (scrollingPos === ScrollPositions.ABOVE) set(marker, panels()[0].data);
		if (scrollingPos === ScrollPositions.BELOW) set(marker, panels()[panels().length - 1].data);
		if (discardSlot()) {
			scrollytellerObserver.observe(get$1(scrollytellerRef));
		}
		getScrollSpeed((newSpeed) => {
			scrollSpeed = newSpeed;
			runDeferredActions();
		});
	});
	legacy_pre_effect(
		() => deep_read_state(layout()),
		() => {
			set(_layout, {
				align: layout().align || 'centre',
				mobileVariant: layout().mobileVariant || 'blocks',
				// or rows
				resizeInteractive: layout().resizeInteractive ?? true,
				transparentFloat: layout().transparentFloat ?? ['left', 'right'].includes(layout().align)
			});
		}
	);
	legacy_pre_effect(
		() => (get$1(_layout), deep_read_state(observerOptions())),
		() => {
			set(_observerOptions, {
				rootMargin: get$1(_layout).mobileVariant === 'rows' ? '-50% 0% 0% 0%' : void 0,
				...(observerOptions() || {})
			});
		}
	);
	legacy_pre_effect(
		() => deep_read_state(ratio()),
		() => {
			store_set(ratioStore, ratio());
		}
	);
	legacy_pre_effect(
		() => deep_read_state(vizMarkerThreshold()),
		() => {
			if (vizMarkerThreshold() >= 50) {
				throw new Error('vizMarkerThreshold must be <50% screen height');
			}
		}
	);
	legacy_pre_effect(
		() => deep_read_state(discardSlot()),
		() => {
			set(maxScrollSpeed, discardSlot() ? 0.5 : Infinity);
		}
	);
	legacy_pre_effect(
		() => (get$1(marker), deep_read_state(onMarker())),
		() => {
			get$1(marker) && deferUntilScrollSettles(() => onMarker()(get$1(marker)));
		}
	);
	legacy_pre_effect(
		() => {},
		() => {
			set(isDebug, typeof location !== 'undefined' && location.hash === '#debug=true');
		}
	);
	legacy_pre_effect_reset();
	init();
	var fragment_1 = root();
	head(($$anchor2) => {
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
		get isDebug() {
			return get$1(isDebug);
		},
		get vizMarkerThreshold() {
			return vizMarkerThreshold();
		},
		get marker() {
			return get$1(marker);
		},
		set marker($$value) {
			set(marker, $$value);
		},
		$$legacy: true
	});
	var div = sibling(node_3, 2);
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
					slot(node_5, $$props, 'default', {});
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
					slot(node_7, $$props, 'default', {});
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
			set(panelRoot, $$value);
		},
		$$legacy: true
	});
	reset(div_1);
	bind_this(
		div_1,
		($$value) => set(scrollytellerRef, $$value),
		() => get$1(scrollytellerRef)
	);
	reset(div);
	template_effect(
		($0, $1) => {
			classes = set_class(div_1, 1, 'scrollyteller svelte-unolp6', null, classes, {
				'scrollyteller--resized': get$1(_layout).resizeInteractive,
				'scrollyteller--debug': get$1(isDebug),
				'scrollyteller--columns': $0,
				'scrollyteller--mobile-row-variant': $1
			});
			set_style(div_1, '--maxScrollytellerWidthPx', $maxScrollytellerWidthStore() + 'px');
			set_style(
				div_1,
				'--rightColumnWidth',
				`min(calc(var(--maxScrollytellerWidth) * var(--vizMaxWidth)), ${$maxGraphicWidthStore()}px)`
			);
		},
		[
			() => ['left', 'right'].includes(get$1(_layout).align),
			() => ['rows'].includes(get$1(_layout).mobileVariant)
		],
		derived_safe_equal
	);
	append($$anchor, fragment_1);
	var $$pop = pop({
		get customPanel() {
			return customPanel();
		},
		set customPanel($$value) {
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
		set onProgress($$value) {
			onProgress($$value);
			flushSync();
		},
		get onMarker() {
			return onMarker();
		},
		set onMarker($$value) {
			onMarker($$value);
			flushSync();
		},
		get onLoad() {
			return onLoad();
		},
		set onLoad($$value) {
			onLoad($$value);
			flushSync();
		},
		get observerOptions() {
			return observerOptions();
		},
		set observerOptions($$value) {
			observerOptions($$value);
			flushSync();
		},
		get discardSlot() {
			return discardSlot();
		},
		set discardSlot($$value) {
			discardSlot($$value);
			flushSync();
		},
		get layout() {
			return layout();
		},
		set layout($$value) {
			layout($$value);
			flushSync();
		},
		get ratio() {
			return ratio();
		},
		set ratio($$value) {
			ratio($$value);
			flushSync();
		},
		get vizMarkerThreshold() {
			return vizMarkerThreshold();
		},
		set vizMarkerThreshold($$value) {
			vizMarkerThreshold($$value);
			flushSync();
		}
	});
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
		vizMarkerThreshold: {}
	},
	['default'],
	[],
	true
);
function Scrollyteller_wc($$anchor, $$props) {
	const $$sanitized_props = legacy_rest_props($$props, [
		'children',
		'$$slots',
		'$$events',
		'$$legacy',
		'$$host'
	]);
	const $$restProps = legacy_rest_props($$sanitized_props, ['panels', 'layout']);
	push($$props, false);
	let panels = prop($$props, 'panels', 28, () => []);
	let layout = prop($$props, 'layout', 28, () => ({}));
	init();
	var fragment = comment();
	var node = first_child(fragment);
	{
		var consequent = ($$anchor2) => {
			Scrollyteller(
				$$anchor2,
				spread_props(
					{
						get panels() {
							return panels();
						},
						get layout() {
							return layout();
						}
					},
					() => $$restProps,
					{
						$$events: {
							progress($$arg) {
								bubble_event.call(this, $$props, $$arg);
							},
							marker($$arg) {
								bubble_event.call(this, $$props, $$arg);
							},
							load($$arg) {
								bubble_event.call(this, $$props, $$arg);
							}
						}
					}
				)
			);
		};
		if_block(node, ($$render) => {
			if (panels().length) $$render(consequent);
		});
	}
	append($$anchor, fragment);
	return pop({
		get panels() {
			return panels();
		},
		set panels($$value) {
			panels($$value);
			flushSync();
		},
		get layout() {
			return layout();
		},
		set layout($$value) {
			layout($$value);
			flushSync();
		}
	});
}
customElements.define(
	'abcnews-scrollyteller',
	create_custom_element(Scrollyteller_wc, { panels: {}, layout: {} }, [], [], false)
);
var makeArray = (val) => (typeof val === 'string' ? [val] : val);
function src_default(string, { propMap = {}, arrayProps = [], noTypeGuessing = [] } = {}) {
	const config = string.match(/[A-Z]+([0-9a-z]|$)+/g) || [];
	arrayProps = makeArray(arrayProps);
	noTypeGuessing = makeArray(noTypeGuessing);
	const result = config
		.map((str) => {
			const [, keyStr, valueStr] = str.match(/^([A-Z]+)([0-9a-z]*$)/) || [];
			if (typeof keyStr !== 'string' || typeof valueStr !== 'string') {
				throw new Error('Error reading key/value pair');
			}
			const key = propMap[keyStr.toLowerCase()] || keyStr.toLowerCase();
			const value = noTypeGuessing.includes(key)
				? valueStr
				: parseFloat(valueStr).toString() === valueStr
					? parseFloat(valueStr)
					: valueStr === 'true' || valueStr === 'yes'
						? true
						: valueStr === 'false' || valueStr === 'no'
							? false
							: valueStr === ''
								? null
								: valueStr;
			return { key, value };
		})
		.reduce((obj, { key, value }, _, arr) => {
			if (typeof obj[key] !== 'undefined') return obj;
			const allKeyValues = arr.filter(({ key: k }) => k === key).map((d) => d.value);
			const makeArray2 = arrayProps.includes(key) || allKeyValues.length > 1;
			if (makeArray2) {
				const err = new Error("Inconsistent types in array property '" + key + "'");
				if (typeof value === 'string') {
					const vals = allKeyValues.filter((d) => typeof d === 'string');
					if (vals.length !== allKeyValues.length) throw err;
					obj[key] = vals;
				}
				if (typeof value === 'number') {
					const vals = allKeyValues.filter((d) => typeof d === 'number');
					if (vals.length !== allKeyValues.length) throw err;
					obj[key] = vals;
				}
				if (typeof value === 'boolean') {
					const vals = allKeyValues.filter((d) => typeof d === 'boolean');
					if (vals.length !== allKeyValues.length) throw err;
					obj[key] = vals;
				}
			} else {
				obj[key] = value;
			}
			return obj;
		}, {});
	arrayProps.forEach((key) => {
		if (typeof result[key] === 'undefined') {
			result[key] = [];
		}
	});
	return result;
}
var ERROR_MOUNT_ALREADY_USED = 'Mount point already used.';
var INSTANCE_ID = (() => {
	let a = 0,
		b;
	for (
		b = '';
		a++ < 36;
		b += (a * 51) & 52 ? (a ^ 15 ? 8 ^ (Math.random() * (a ^ 20 ? 16 : 4)) : 4).toString(16) : '-'
	);
	return b;
})();
var MOUNT_SELECTOR_TEMPLATE = ['[data-mount][id', ']'];
var MOUNT_SELECTOR = MOUNT_SELECTOR_TEMPLATE.join('');
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
	return typeof x === 'object' && x instanceof Node;
}
function isElement(x) {
	return isNode(x) && x.nodeType === Node.ELEMENT_NODE;
}
function isMount(x, value, exact = false) {
	return (
		isElement(x) &&
		(value === void 0
			? x.matches(MOUNT_SELECTOR)
			: exact
				? x.matches(exactMountSelector(value))
				: x.matches(prefixedMountSelector(value)))
	);
}
function getMountValue(el, value = '') {
	const re = new RegExp(`^${value.replace(/[^\w.\-:]/g, '')}`);
	return (el.getAttribute('id') || el.getAttribute('name') || '').replace(re, '');
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
function selectMounts(selector, { exact = false, includeOwnUsed = false, markAsUsed = true } = {}) {
	const s =
		selector !== void 0
			? exact
				? exactMountSelector(selector)
				: prefixedMountSelector(selector)
			: MOUNT_SELECTOR;
	return Array.from(document.querySelectorAll(s))
		.filter((el) => isMount(el))
		.filter((mount2) =>
			includeOwnUsed ? isUsedBy(mount2) === INSTANCE_ID || !isUsed(mount2) : !isUsed(mount2)
		)
		.map((mount2) => {
			markAsUsed && useMount(mount2);
			return mount2;
		});
}
const piecemeal = Symbol('piecemeal');
const SELECTOR_COMMON = 'scrollyteller';
function excludePanelMeta(config) {
	const _config = {
		...config
	};
	delete _config[piecemeal];
	delete _config.align;
	return _config;
}
const loadScrollyteller = (name, className, markerName = 'mark') => {
	window.__scrollytellers = window.__scrollytellers || {};
	const openingMountValuePrefix = `${SELECTOR_COMMON}${name ? `NAME${name}` : ''}`;
	name = name || 'scrollyteller';
	if (!window.__scrollytellers[name]) {
		const firstEl = selectMounts(openingMountValuePrefix)[0];
		if (!firstEl) {
			throw new Error(`Couldn't find element for #${openingMountValuePrefix}`);
		}
		if (!isMount(firstEl)) {
			throw new Error('Attempting to mount to a non-mount node');
		}
		className && firstEl.classList.add(className);
		const config = src_default(getMountValue(firstEl, openingMountValuePrefix));
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
				nextConfigAndMeta = src_default(configString);
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
export { Scrollyteller_wc as default, loadScrollyteller };
