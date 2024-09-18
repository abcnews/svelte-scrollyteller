var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
function noop() {
}
function assign(tar, src) {
  for (const k in src) tar[k] = src[k];
  return (
    /** @type {T & S} */
    tar
  );
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props) if (k[0] !== "$") result[k] = props[k];
  return result;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props) if (!keys.has(k) && k[0] !== "$") rest[k] = props[k];
  return rest;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
function append(target, node) {
  target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
  const append_styles_to = get_root_for_style(target);
  if (!append_styles_to.getElementById(style_sheet_id)) {
    const style = element("style");
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}
function get_root_for_style(node) {
  if (!node) return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && /** @type {ShadowRoot} */
  root.host) {
    return (
      /** @type {ShadowRoot} */
      root
    );
  }
  return node.ownerDocument;
}
function append_stylesheet(node, style) {
  append(
    /** @type {Document} */
    node.head || node,
    style
  );
  return style.sheet;
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
function children$1(element2) {
  return Array.from(element2.childNodes);
}
function set_style(node, key, value, important) {
  if (value == null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, "");
  }
}
function toggle_class(element2, name, toggle) {
  element2.classList.toggle(name, !!toggle);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function get_custom_elements_slots(element2) {
  const result = {};
  element2.childNodes.forEach(
    /** @param {Element} node */
    (node) => {
      result[node.slot || "default"] = true;
    }
  );
  return result;
}
function construct_svelte_component(component, props) {
  return new component(props);
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2) block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2)) update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles2 = null, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles2 && append_styles2($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children$1(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor($$componentCtor, $$slots, use_shadow_dom) {
      super();
      /** The Svelte component constructor */
      __publicField(this, "$$ctor");
      /** Slots */
      __publicField(this, "$$s");
      /** The Svelte component instance */
      __publicField(this, "$$c");
      /** Whether or not the custom element is connected */
      __publicField(this, "$$cn", false);
      /** Component props data */
      __publicField(this, "$$d", {});
      /** `true` if currently in the process of reflecting component props back to attributes */
      __publicField(this, "$$r", false);
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      __publicField(this, "$$p_d", {});
      /** @type {Record<string, Function[]>} Event listeners */
      __publicField(this, "$$l", {});
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      __publicField(this, "$$l_u", /* @__PURE__ */ new Map());
      this.$$ctor = $$componentCtor;
      this.$$s = $$slots;
      if (use_shadow_dom) {
        this.attachShadow({ mode: "open" });
      }
    }
    addEventListener(type, listener, options) {
      this.$$l[type] = this.$$l[type] || [];
      this.$$l[type].push(listener);
      if (this.$$c) {
        const unsub = this.$$c.$on(type, listener);
        this.$$l_u.set(listener, unsub);
      }
      super.addEventListener(type, listener, options);
    }
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
        let create_slot2 = function(name) {
          return () => {
            let node;
            const obj = {
              c: function create() {
                node = element("slot");
                if (name !== "default") {
                  attr(node, "name", name);
                }
              },
              /**
               * @param {HTMLElement} target
               * @param {HTMLElement} [anchor]
               */
              m: function mount(target, anchor) {
                insert(target, node, anchor);
              },
              d: function destroy(detaching) {
                if (detaching) {
                  detach(node);
                }
              }
            };
            return obj;
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
            $$slots[name] = [create_slot2(name)];
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
        this.$$c = new this.$$ctor({
          target: this.shadowRoot || this,
          props: {
            ...this.$$d,
            $$slots,
            $$scope: {
              ctx: []
            }
          }
        });
        const reflect_attributes = () => {
          this.$$r = true;
          for (const key in this.$$p_d) {
            this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
            if (this.$$p_d[key].reflect) {
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
          }
          this.$$r = false;
        };
        this.$$c.$$.after_update.push(reflect_attributes);
        reflect_attributes();
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
    attributeChangedCallback(attr2, _oldValue, newValue) {
      var _a;
      if (this.$$r) return;
      attr2 = this.$$g_p(attr2);
      this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
      (_a = this.$$c) == null ? void 0 : _a.$set({ [attr2]: this.$$d[attr2] });
    }
    disconnectedCallback() {
      this.$$cn = false;
      Promise.resolve().then(() => {
        if (!this.$$cn && this.$$c) {
          this.$$c.$destroy();
          this.$$c = void 0;
        }
      });
    }
    $$g_p(attribute_name) {
      return Object.keys(this.$$p_d).find(
        (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
      ) || attribute_name;
    }
  };
}
function get_custom_element_value(prop, value, props_definition, transform) {
  var _a;
  const type = (_a = props_definition[prop]) == null ? void 0 : _a.type;
  value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
  if (!transform || !props_definition[prop]) {
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
      case "Number":
        return value != null ? +value : value;
      default:
        return value;
    }
  }
}
function create_custom_element(Component, props_definition, slots, accessors, use_shadow_dom, extend) {
  let Class = class extends SvelteElement {
    constructor() {
      super(Component, slots, use_shadow_dom);
      this.$$p_d = props_definition;
    }
    static get observedAttributes() {
      return Object.keys(props_definition).map(
        (key) => (props_definition[key].attribute || key).toLowerCase()
      );
    }
  };
  Object.keys(props_definition).forEach((prop) => {
    Object.defineProperty(Class.prototype, prop, {
      get() {
        return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
      },
      set(value) {
        var _a;
        value = get_custom_element_value(prop, value, props_definition);
        this.$$d[prop] = value;
        (_a = this.$$c) == null ? void 0 : _a.$set({ [prop]: value });
      }
    });
  });
  accessors.forEach((accessor) => {
    Object.defineProperty(Class.prototype, accessor, {
      get() {
        var _a;
        return (_a = this.$$c) == null ? void 0 : _a[accessor];
      }
    });
  });
  Component.element = /** @type {any} */
  Class;
  return Class;
}
class SvelteComponent {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}
const PUBLIC_VERSION = "4";
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
const children = (el, children2) => {
  children2.forEach((node) => el.appendChild(node));
  return {
    destroy() {
      children2.forEach((node) => el.removeChild(node));
    }
  };
};
function add_css$2(target) {
  append_styles(target, "svelte-ov3zac", '.st-panel-root.svelte-ov3zac{--panel-radius:0.75rem;--panel-background:var(--color-panel-background, rgba(255, 255, 255, 0.95));--panel-color:var(--color-panel-text, #000);--panel-opacity:var(--color-panel-opacity, 1);--panel-filter:var(--color-panel-filter, blur(2.5px));--panel-border:var(--color-panel-border, 1px solid rgba(0, 0, 0, 0.15));--panel-padding:1rem;--panel-margin:1rem;box-sizing:border-box;margin:80vh auto;width:calc(100% - var(--panel-margin) * 2);position:relative;z-index:1;pointer-events:none;font-size:1.125rem}@media(min-width: 46.5rem){.st-panel-root.svelte-ov3zac{--panel-padding:2rem;--panel-margin:2rem}}[data-scheme="dark"] .st-panel-root.svelte-ov3zac,.is-dark-mode .st-panel-root.svelte-ov3zac{--panel-background:var(--color-panel-background, rgba(15, 15, 15, 0.95));--panel-color:var(--color-panel-text, #ebebeb);--panel-border:var(--color-panel-border, 1px solid rgba(255, 255, 255, 0.15))}.scrollyteller--debug .st-panel-root.svelte-ov3zac{outline:5px solid limegreen}.st-panel-root.first.svelte-ov3zac{margin-top:100dvh}.st-panel-root.last.svelte-ov3zac{margin-bottom:100vh}@media(min-width: 62rem){.st-panel-root--centre.svelte-ov3zac{max-width:48.75rem;font-size:1.875}}@media(min-width: 90rem){.st-panel-root--centre.svelte-ov3zac{max-width:56.25rem}}@media(min-width: 62rem){.st-panel-root--left.svelte-ov3zac,.st-panel-root--right.svelte-ov3zac{--maxWidth:45%;--panel-margin:2rem;--panel-margin-inner:calc(var(--panel-margin) / 2);max-width:calc(var(--maxWidth) - (var(--panel-margin) + var(--panel-margin-inner)));margin:30vh 0 30vh var(--panel-margin);font-size:1.125rem}.st-panel-root--left.st-panel-root--transparent-blocks.svelte-ov3zac,.st-panel-root--right.st-panel-root--transparent-blocks.svelte-ov3zac{--panel-filter:none;--panel-background:none;--panel-border:none;--panel-padding:0}.st-panel-root--left.first.svelte-ov3zac,.st-panel-root--right.first.svelte-ov3zac{margin-top:50dvh}}@media(min-width: 75rem){.st-panel-root--left.svelte-ov3zac,.st-panel-root--right.svelte-ov3zac{--panel-margin:3rem;--maxWidth:40%;font-size:1.125rem}}@media(min-width: 90rem){.st-panel-root--left.svelte-ov3zac,.st-panel-root--right.svelte-ov3zac{--panel-margin:4rem;--maxWidth:40%;font-size:1.25rem}}@media(min-width: 62rem){.st-panel-root--right.svelte-ov3zac{margin:15vh calc(var(--marginLeft) - 1rem) 15vh auto}}.st-panel.svelte-ov3zac{-webkit-backdrop-filter:var(--panel-filter);backdrop-filter:var(--panel-filter);color:var(--panel-color);border-radius:var(--panel-radius);padding:var(--panel-padding)}.st-panel.svelte-ov3zac::before{content:"";background-color:var(--panel-background);opacity:var(--panel-opacity);border-radius:var(--panel-radius);border:var(--panel-border);position:absolute;z-index:-1;top:0;left:0;width:100%;height:100%}.st-panel.svelte-ov3zac::after{content:"";display:table;clear:both}.st-panel.svelte-ov3zac > *{font-family:ABCSans, sans-serif;font-size:inherit;line-height:1.666666667;color:var(--panel-color);margin-top:0;margin-left:auto !important;margin-right:auto !important;pointer-events:all}.st-panel.svelte-ov3zac > *:last-child{margin-bottom:0}.st-panel.svelte-ov3zac>img{max-width:66%;display:block;margin:auto;height:auto}');
}
function create_fragment$4(ctx) {
  let div1;
  let div0;
  let mounted;
  let dispose;
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      attr(div0, "class", "st-panel svelte-ov3zac");
      attr(
        div1,
        "data-align",
        /*align*/
        ctx[1]
      );
      attr(div1, "class", null_to_empty(`st-panel-root ${/*panelClass*/
      ctx[3] || ""}`) + " svelte-ov3zac");
      toggle_class(
        div1,
        "st-panel-root--left",
        /*align*/
        ctx[1] === "left"
      );
      toggle_class(
        div1,
        "st-panel-root--right",
        /*align*/
        ctx[1] === "right"
      );
      toggle_class(
        div1,
        "st-panel-root--centre",
        /*align*/
        ctx[1] === "centre"
      );
      toggle_class(
        div1,
        "st-panel-root--transparent-blocks",
        /*transparentFloat*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      ctx[6](div1);
      if (!mounted) {
        dispose = action_destroyer(children.call(
          null,
          div0,
          /*nodes*/
          ctx[4]
        ));
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      ctx[6](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { props } = $$props;
  const { align, transparentFloat, panelClass, data, nodes = [], steps = [] } = props;
  let panelRef;
  onMount(() => {
    $$invalidate(0, panelRef.scrollyData = data, panelRef);
    steps.push(panelRef);
  });
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      panelRef = $$value;
      $$invalidate(0, panelRef);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("props" in $$props2) $$invalidate(5, props = $$props2.props);
  };
  return [panelRef, align, transparentFloat, panelClass, nodes, props, div1_binding];
}
class Panel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$4, safe_not_equal, { props: 5 }, add_css$2);
  }
  get props() {
    return this.$$.ctx[5];
  }
  set props(props) {
    this.$$set({ props });
    flush();
  }
}
create_custom_element(Panel, { "props": {} }, [], [], true);
var ScrollPositions = /* @__PURE__ */ ((ScrollPositions2) => {
  ScrollPositions2["FULL"] = "FULL";
  ScrollPositions2["ABOVE"] = "ABOVE";
  ScrollPositions2["BELOW"] = "BELOW";
  return ScrollPositions2;
})(ScrollPositions || {});
const getScrollingPos = (scrollytellerRef) => {
  const boundingRect = scrollytellerRef.getBoundingClientRect();
  if (boundingRect.bottom - window.innerHeight < 0) {
    return "BELOW";
  }
  if (boundingRect.top > 0) {
    return "ABOVE";
  }
  return "FULL";
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
const { window: window_1 } = globals;
function create_fragment$3(ctx) {
  let mounted;
  let dispose;
  return {
    c: noop,
    m(target, anchor) {
      if (!mounted) {
        dispose = listen(
          window_1,
          "scroll",
          /*scrollHandler*/
          ctx[0]
        );
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      mounted = false;
      dispose();
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  const dispatch = createEventDispatcher();
  let { scrollytellerRef } = $$props;
  const scrollHandler = () => {
    const rootRect = scrollytellerRef.getBoundingClientRect();
    dispatch("progress", {
      boundingRect: rootRect,
      rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
      scrollPct: 1 - (rootRect.bottom - window.innerHeight) / (rootRect.height - window.innerHeight)
    });
  };
  $$self.$$set = ($$props2) => {
    if ("scrollytellerRef" in $$props2) $$invalidate(1, scrollytellerRef = $$props2.scrollytellerRef);
  };
  return [scrollHandler, scrollytellerRef];
}
class OnProgressHandler extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$3, safe_not_equal, { scrollytellerRef: 1 });
  }
  get scrollytellerRef() {
    return this.$$.ctx[1];
  }
  set scrollytellerRef(scrollytellerRef) {
    this.$$set({ scrollytellerRef });
    flush();
  }
}
create_custom_element(OnProgressHandler, { "scrollytellerRef": {} }, [], [], true);
function instance$3($$self, $$props, $$invalidate) {
  let { onProgress } = $$props;
  let { onMarker } = $$props;
  $$self.$$set = ($$props2) => {
    if ("onProgress" in $$props2) $$invalidate(0, onProgress = $$props2.onProgress);
    if ("onMarker" in $$props2) $$invalidate(1, onMarker = $$props2.onMarker);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*onProgress, onMarker*/
    3) {
      {
        if (typeof onProgress === "function") {
          throw new Error("the onProgress callback is deprecated. Please use on:progress");
        }
        if (typeof onMarker === "function") {
          throw new Error("the onMarker callback is deprecated. Please use on:marker");
        }
      }
    }
  };
  return [onProgress, onMarker];
}
class DeprecationNotice extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, null, safe_not_equal, { onProgress: 0, onMarker: 1 });
  }
  get onProgress() {
    return this.$$.ctx[0];
  }
  set onProgress(onProgress) {
    this.$$set({ onProgress });
    flush();
  }
  get onMarker() {
    return this.$$.ctx[1];
  }
  set onMarker(onMarker) {
    this.$$set({ onMarker });
    flush();
  }
}
create_custom_element(DeprecationNotice, { "onProgress": {}, "onMarker": {} }, [], [], true);
function add_css$1(target) {
  append_styles(target, "svelte-1iywulw", ".panelobserver-debug.svelte-1iywulw{position:sticky;left:0;width:100%;background:rgba(0, 0, 0, 0.1);border:1px solid rgba(0, 255, 47, 0.4);border-style:solid none solid;z-index:0}");
}
function create_if_block$2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "panelobserver-debug svelte-1iywulw");
      set_style(
        div,
        "top",
        /*rootMargin*/
        ctx[3] + "px"
      );
      set_style(
        div,
        "height",
        /*innerHeight*/
        ctx[2] - /*rootMargin*/
        ctx[3] * 2 + "px"
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*rootMargin*/
      8) {
        set_style(
          div,
          "top",
          /*rootMargin*/
          ctx2[3] + "px"
        );
      }
      if (dirty & /*innerHeight, rootMargin*/
      12) {
        set_style(
          div,
          "height",
          /*innerHeight*/
          ctx2[2] - /*rootMargin*/
          ctx2[3] * 2 + "px"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment$2(ctx) {
  let if_block_anchor;
  let mounted;
  let dispose;
  add_render_callback(
    /*onwindowresize*/
    ctx[14]
  );
  let if_block = (
    /*isDebug*/
    ctx[0] && /*rootMargin*/
    ctx[3] && create_if_block$2(ctx)
  );
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      if (!mounted) {
        dispose = listen(
          window,
          "resize",
          /*onwindowresize*/
          ctx[14]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*isDebug*/
        ctx2[0] && /*rootMargin*/
        ctx2[3]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$2(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let isSplitScreen;
  let rootMargin;
  let { align = "" } = $$props;
  let { graphicRootEl } = $$props;
  let { marker } = $$props;
  let { observerOptions } = $$props;
  let { steps } = $$props;
  let { isDebug } = $$props;
  let status = "loading";
  let graphicDims = [0, 0];
  let graphicEl;
  let innerWidth = 0;
  let innerHeight = 0;
  let _observerOptions = observerOptions;
  onMount(() => {
    let observer;
    retryUntil(() => graphicRootEl == null ? void 0 : graphicRootEl.children).then(() => {
      graphicEl = graphicRootEl.children[0];
      observer = new ResizeObserver(([entry]) => $$invalidate(10, graphicDims = [entry.contentRect.width, entry.contentRect.height]));
      observer.observe(graphicEl);
      $$invalidate(9, status = "ready");
    });
    return () => {
      observer == null ? void 0 : observer.disconnect();
    };
  });
  let panelObserver;
  let intersectingPanels = [];
  onMount(() => panelObserver == null ? void 0 : panelObserver.disconnect());
  function onwindowresize() {
    $$invalidate(1, innerWidth = window.innerWidth);
    $$invalidate(2, innerHeight = window.innerHeight);
  }
  $$self.$$set = ($$props2) => {
    if ("align" in $$props2) $$invalidate(5, align = $$props2.align);
    if ("graphicRootEl" in $$props2) $$invalidate(6, graphicRootEl = $$props2.graphicRootEl);
    if ("marker" in $$props2) $$invalidate(4, marker = $$props2.marker);
    if ("observerOptions" in $$props2) $$invalidate(7, observerOptions = $$props2.observerOptions);
    if ("steps" in $$props2) $$invalidate(8, steps = $$props2.steps);
    if ("isDebug" in $$props2) $$invalidate(0, isDebug = $$props2.isDebug);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*align, innerWidth*/
    34) {
      $$invalidate(13, isSplitScreen = ["left", "right"].includes(align) && innerWidth >= 992);
    }
    if ($$self.$$.dirty & /*observerOptions, isSplitScreen, innerHeight, graphicDims*/
    9348) {
      $$invalidate(3, rootMargin = observerOptions || !isSplitScreen ? null : Math.round((innerHeight - graphicDims[1] * 0.6) / 2));
    }
    if ($$self.$$.dirty & /*observerOptions, isSplitScreen, rootMargin*/
    8328) {
      {
        if (observerOptions) {
          $$invalidate(11, _observerOptions = observerOptions);
        } else if (isSplitScreen) {
          $$invalidate(11, _observerOptions = {
            rootMargin: `-${rootMargin}px 0px -${rootMargin}px 0px`
          });
        } else {
          $$invalidate(11, _observerOptions = { threshold: 0.5 });
        }
      }
    }
    if ($$self.$$.dirty & /*status, panelObserver, _observerOptions, steps*/
    6912) {
      {
        if (status === "ready") {
          panelObserver == null ? void 0 : panelObserver.disconnect();
          $$invalidate(12, panelObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  intersectingPanels.push(entry);
                } else {
                  const itemToRemove = intersectingPanels.findIndex((panel) => panel.target === entry.target);
                  if (itemToRemove === -1) return;
                  intersectingPanels.splice(itemToRemove, 1);
                }
                const newPanel = intersectingPanels[intersectingPanels.length - 1];
                if (newPanel) {
                  $$invalidate(4, marker = newPanel.target.scrollyData);
                }
              });
            },
            _observerOptions
          ));
          steps.forEach((step, i) => {
            panelObserver.observe(step);
          });
        } else {
          panelObserver == null ? void 0 : panelObserver.disconnect();
        }
      }
    }
  };
  return [
    isDebug,
    innerWidth,
    innerHeight,
    rootMargin,
    marker,
    align,
    graphicRootEl,
    observerOptions,
    steps,
    status,
    graphicDims,
    _observerOptions,
    panelObserver,
    isSplitScreen,
    onwindowresize
  ];
}
class PanelObserver extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$2,
      create_fragment$2,
      safe_not_equal,
      {
        align: 5,
        graphicRootEl: 6,
        marker: 4,
        observerOptions: 7,
        steps: 8,
        isDebug: 0
      },
      add_css$1
    );
  }
  get align() {
    return this.$$.ctx[5];
  }
  set align(align) {
    this.$$set({ align });
    flush();
  }
  get graphicRootEl() {
    return this.$$.ctx[6];
  }
  set graphicRootEl(graphicRootEl) {
    this.$$set({ graphicRootEl });
    flush();
  }
  get marker() {
    return this.$$.ctx[4];
  }
  set marker(marker) {
    this.$$set({ marker });
    flush();
  }
  get observerOptions() {
    return this.$$.ctx[7];
  }
  set observerOptions(observerOptions) {
    this.$$set({ observerOptions });
    flush();
  }
  get steps() {
    return this.$$.ctx[8];
  }
  set steps(steps) {
    this.$$set({ steps });
    flush();
  }
  get isDebug() {
    return this.$$.ctx[0];
  }
  set isDebug(isDebug) {
    this.$$set({ isDebug });
    flush();
  }
}
create_custom_element(PanelObserver, { "align": {}, "graphicRootEl": {}, "marker": {}, "observerOptions": {}, "steps": {}, "isDebug": {} }, [], [], true);
function add_css(target) {
  append_styles(target, "svelte-1h184zu", '.scrollyteller.svelte-1h184zu.svelte-1h184zu{position:relative}.scrollyteller--resized.svelte-1h184zu.svelte-1h184zu{max-width:127.5rem;margin:0 auto}.scrollyteller--debug.svelte-1h184zu.svelte-1h184zu:after{content:"Mobile";position:fixed;right:0.5rem;top:0.5rem;padding:0.5rem 1rem;background:white;color:black;border:5px solid limegreen;border-radius:1rem;z-index:110}@media(min-width: 46.5rem){.scrollyteller--debug.svelte-1h184zu.svelte-1h184zu:after{content:"Tablet"}}@media(min-width: 62rem){.scrollyteller--debug.svelte-1h184zu.svelte-1h184zu:after{content:"LargeTablet"}}@media(min-width: 75rem){.scrollyteller--debug.svelte-1h184zu.svelte-1h184zu:after{content:"Desktop"}}@media(min-width: 90rem){.scrollyteller--debug.svelte-1h184zu.svelte-1h184zu:after{content:"LargeDesktop"}}.graphic.svelte-1h184zu.svelte-1h184zu{transform:translate3d(0, 0, 0);height:100dvh;width:100%;position:sticky;top:0;left:0;z-index:1}.graphic--resized.svelte-1h184zu.svelte-1h184zu{container-type:size;height:60dvh;top:10dvh;display:flex;justify-content:center;align-items:flex-start;margin:0 auto;width:auto;--margin:1.5rem;margin:0 auto;width:calc(100% - var(--margin) * 2)}@media(min-width: 46.5rem){.graphic--resized.svelte-1h184zu.svelte-1h184zu{--margin:4rem;top:8dvh;height:62dvh}}@media(min-width: 62rem){.graphic--resized.graphic--left.svelte-1h184zu.svelte-1h184zu,.graphic--resized.graphic--right.svelte-1h184zu.svelte-1h184zu{align-items:center;--marginOuter:2rem;--marginCentre:calc(var(--marginOuter) / 2);height:84dvh;top:8dvh;--maxWidth:55%;max-width:calc(var(--maxWidth) - (var(--marginCentre) + var(--marginOuter)))}}@media(min-width: 75rem){.graphic--resized.graphic--left.svelte-1h184zu.svelte-1h184zu,.graphic--resized.graphic--right.svelte-1h184zu.svelte-1h184zu{--marginOuter:3rem;--maxWidth:60%;height:76dvh;top:12dvh}}@media(min-width: 90rem){.graphic--resized.graphic--left.svelte-1h184zu.svelte-1h184zu,.graphic--resized.graphic--right.svelte-1h184zu.svelte-1h184zu{--marginOuter:4rem;--maxWidth:60%;top:10dvh;height:80dvh}}@media(min-width: 62rem){.graphic--resized.graphic--left.svelte-1h184zu.svelte-1h184zu{margin:0 auto 0 var(--marginOuter)}}@media(min-width: 62rem){.graphic--resized.graphic--right.svelte-1h184zu.svelte-1h184zu{margin:0 var(--marginOuter) 0 auto}}@media(min-width: 62rem){.graphic--resized.graphic--centre.svelte-1h184zu.svelte-1h184zu{--margin:3rem;top:8dvh;height:62dvh}}@media(min-width: 75rem){.graphic--resized.graphic--centre.svelte-1h184zu.svelte-1h184zu{--margin:4rem;top:12dvh;height:58dvh}}@media(min-width: 90rem){.graphic--resized.graphic--centre.svelte-1h184zu.svelte-1h184zu{--margin:6rem;top:12dvh;height:58dvh}}.scrollyteller--debug.svelte-1h184zu .graphic--resized.svelte-1h184zu{outline:5px solid limegreen}.content.svelte-1h184zu.svelte-1h184zu{margin:-100dvh auto 0;position:relative;z-index:2;pointer-events:none}.content--resized.svelte-1h184zu.svelte-1h184zu{max-width:127.5rem}');
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[29] = list[i];
  child_ctx[32] = i;
  const constants_0 = (
    /*panel*/
    (child_ctx[29].panelClass ?? "") + /*i*/
    (child_ctx[32] === 0 ? " first" : "") + /*i*/
    (child_ctx[32] === /*panels*/
    child_ctx[1].length - 1 ? " last" : "")
  );
  child_ctx[30] = constants_0;
  return child_ctx;
}
function create_if_block_3(ctx) {
  let onprogresshandler;
  let current;
  onprogresshandler = new OnProgressHandler({
    props: {
      scrollytellerRef: (
        /*scrollytellerRef*/
        ctx[8]
      )
    }
  });
  onprogresshandler.$on(
    "progress",
    /*progress_handler*/
    ctx[17]
  );
  return {
    c() {
      create_component(onprogresshandler.$$.fragment);
    },
    m(target, anchor) {
      mount_component(onprogresshandler, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const onprogresshandler_changes = {};
      if (dirty[0] & /*scrollytellerRef*/
      256) onprogresshandler_changes.scrollytellerRef = /*scrollytellerRef*/
      ctx2[8];
      onprogresshandler.$set(onprogresshandler_changes);
    },
    i(local) {
      if (current) return;
      transition_in(onprogresshandler.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(onprogresshandler.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(onprogresshandler, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let style;
  return {
    c() {
      style = element("style");
      style.textContent = "/* styles required to make position sticky work */\n			/* existing styles on an Odyssey body are preventing position sticky from 'sticking' */\n			body {\n				overflow: visible;\n			}";
    },
    m(target, anchor) {
      insert(target, style, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(style);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[16].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[15],
    null
  );
  return {
    c() {
      if (default_slot) default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope*/
        32768)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[15],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[15]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[15],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function create_else_block(ctx) {
  let panel_1;
  let current;
  panel_1 = new Panel({
    props: {
      props: {
        .../*panel*/
        ctx[29],
        align: (
          /*panel*/
          ctx[29].align || /*_layout*/
          ctx[11].align
        ),
        transparentFloat: (
          /*_layout*/
          ctx[11].transparentFloat
        ),
        steps: (
          /*steps*/
          ctx[13]
        ),
        panelClass: (
          /*panelClass*/
          ctx[30]
        )
      }
    }
  });
  return {
    c() {
      create_component(panel_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(panel_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const panel_1_changes = {};
      if (dirty[0] & /*panels, _layout*/
      2050) panel_1_changes.props = {
        .../*panel*/
        ctx2[29],
        align: (
          /*panel*/
          ctx2[29].align || /*_layout*/
          ctx2[11].align
        ),
        transparentFloat: (
          /*_layout*/
          ctx2[11].transparentFloat
        ),
        steps: (
          /*steps*/
          ctx2[13]
        ),
        panelClass: (
          /*panelClass*/
          ctx2[30]
        )
      };
      panel_1.$set(panel_1_changes);
    },
    i(local) {
      if (current) return;
      transition_in(panel_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(panel_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(panel_1, detaching);
    }
  };
}
function create_if_block$1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    /*panel*/
    ctx[29],
    { steps: (
      /*steps*/
      ctx[13]
    ) },
    { panelClass: (
      /*panelClass*/
      ctx[30]
    ) }
  ];
  var switch_value = (
    /*customPanel*/
    ctx[0]
  );
  function switch_props(ctx2, dirty) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    if (dirty !== void 0 && dirty[0] & /*panels, steps*/
    8194) {
      switch_instance_props = assign(switch_instance_props, get_spread_update(switch_instance_spread_levels, [
        dirty[0] & /*panels*/
        2 && get_spread_object(
          /*panel*/
          ctx2[29]
        ),
        dirty[0] & /*steps*/
        8192 && { steps: (
          /*steps*/
          ctx2[13]
        ) },
        dirty[0] & /*panels*/
        2 && { panelClass: (
          /*panelClass*/
          ctx2[30]
        ) }
      ]));
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*customPanel*/
      1 && switch_value !== (switch_value = /*customPanel*/
      ctx2[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = dirty[0] & /*panels, steps*/
        8194 ? get_spread_update(switch_instance_spread_levels, [
          dirty[0] & /*panels*/
          2 && get_spread_object(
            /*panel*/
            ctx2[29]
          ),
          dirty[0] & /*steps*/
          8192 && { steps: (
            /*steps*/
            ctx2[13]
          ) },
          dirty[0] & /*panels*/
          2 && { panelClass: (
            /*panelClass*/
            ctx2[30]
          ) }
        ]) : {};
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
}
function create_each_block(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*customPanel*/
      ctx2[0]
    ) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let t0;
  let deprecationnotice;
  let t1;
  let panelobserver;
  let updating_marker;
  let t2;
  let if_block1_anchor;
  let t3;
  let div2;
  let div0;
  let t4;
  let div1;
  let current;
  let if_block0 = (
    /*onProgress*/
    ctx[2] && create_if_block_3(ctx)
  );
  deprecationnotice = new DeprecationNotice({
    props: {
      onProgress: (
        /*onProgress*/
        ctx[2]
      ),
      onMarker: (
        /*onMarker*/
        ctx[3]
      )
    }
  });
  function panelobserver_marker_binding(value) {
    ctx[18](value);
  }
  let panelobserver_props = {
    steps: (
      /*steps*/
      ctx[13]
    ),
    observerOptions: (
      /*observerOptions*/
      ctx[4]
    ),
    graphicRootEl: (
      /*graphicRootEl*/
      ctx[7]
    ),
    isDebug: (
      /*isDebug*/
      ctx[10]
    ),
    align: (
      /*_layout*/
      ctx[11].align
    )
  };
  if (
    /*marker*/
    ctx[6] !== void 0
  ) {
    panelobserver_props.marker = /*marker*/
    ctx[6];
  }
  panelobserver = new PanelObserver({ props: panelobserver_props });
  binding_callbacks.push(() => bind(panelobserver, "marker", panelobserver_marker_binding));
  let if_block1 = (
    /*isOdyssey*/
    ctx[12] && create_if_block_2()
  );
  let if_block2 = (
    /*isInViewport*/
    (ctx[9] || /*discardSlot*/
    ctx[5] === false) && create_if_block_1(ctx)
  );
  let each_value = ensure_array_like(
    /*panels*/
    ctx[1]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(deprecationnotice.$$.fragment);
      t1 = space();
      create_component(panelobserver.$$.fragment);
      t2 = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      t3 = space();
      div2 = element("div");
      div0 = element("div");
      if (if_block2) if_block2.c();
      t4 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div0, "class", "graphic svelte-1h184zu");
      toggle_class(
        div0,
        "graphic--resized",
        /*_layout*/
        ctx[11].resizeInteractive
      );
      toggle_class(
        div0,
        "graphic--right",
        /*_layout*/
        ctx[11].resizeInteractive && /*_layout*/
        ctx[11].align === "left"
      );
      toggle_class(
        div0,
        "graphic--left",
        /*_layout*/
        ctx[11].resizeInteractive && /*_layout*/
        ctx[11].align === "right"
      );
      toggle_class(
        div0,
        "graphic--centre",
        /*_layout*/
        ctx[11].resizeInteractive && /*_layout*/
        ctx[11].align === "centre"
      );
      attr(div1, "class", "content svelte-1h184zu");
      toggle_class(div1, "content--resized", !/*_layout*/
      ctx[11].resizeInteractive);
      attr(div2, "class", "scrollyteller svelte-1h184zu");
      toggle_class(
        div2,
        "scrollyteller--resized",
        /*_layout*/
        ctx[11].resizeInteractive
      );
      toggle_class(
        div2,
        "scrollyteller--debug",
        /*isDebug*/
        ctx[10]
      );
    },
    m(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert(target, t0, anchor);
      mount_component(deprecationnotice, target, anchor);
      insert(target, t1, anchor);
      mount_component(panelobserver, target, anchor);
      insert(target, t2, anchor);
      if (if_block1) if_block1.m(document.head, null);
      append(document.head, if_block1_anchor);
      insert(target, t3, anchor);
      insert(target, div2, anchor);
      append(div2, div0);
      if (if_block2) if_block2.m(div0, null);
      ctx[19](div0);
      append(div2, t4);
      append(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      ctx[20](div2);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*onProgress*/
        ctx2[2]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*onProgress*/
          4) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      const deprecationnotice_changes = {};
      if (dirty[0] & /*onProgress*/
      4) deprecationnotice_changes.onProgress = /*onProgress*/
      ctx2[2];
      if (dirty[0] & /*onMarker*/
      8) deprecationnotice_changes.onMarker = /*onMarker*/
      ctx2[3];
      deprecationnotice.$set(deprecationnotice_changes);
      const panelobserver_changes = {};
      if (dirty[0] & /*observerOptions*/
      16) panelobserver_changes.observerOptions = /*observerOptions*/
      ctx2[4];
      if (dirty[0] & /*graphicRootEl*/
      128) panelobserver_changes.graphicRootEl = /*graphicRootEl*/
      ctx2[7];
      if (dirty[0] & /*isDebug*/
      1024) panelobserver_changes.isDebug = /*isDebug*/
      ctx2[10];
      if (dirty[0] & /*_layout*/
      2048) panelobserver_changes.align = /*_layout*/
      ctx2[11].align;
      if (!updating_marker && dirty[0] & /*marker*/
      64) {
        updating_marker = true;
        panelobserver_changes.marker = /*marker*/
        ctx2[6];
        add_flush_callback(() => updating_marker = false);
      }
      panelobserver.$set(panelobserver_changes);
      if (
        /*isInViewport*/
        ctx2[9] || /*discardSlot*/
        ctx2[5] === false
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty[0] & /*isInViewport, discardSlot*/
          544) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_1(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div0, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (!current || dirty[0] & /*_layout*/
      2048) {
        toggle_class(
          div0,
          "graphic--resized",
          /*_layout*/
          ctx2[11].resizeInteractive
        );
      }
      if (!current || dirty[0] & /*_layout*/
      2048) {
        toggle_class(
          div0,
          "graphic--right",
          /*_layout*/
          ctx2[11].resizeInteractive && /*_layout*/
          ctx2[11].align === "left"
        );
      }
      if (!current || dirty[0] & /*_layout*/
      2048) {
        toggle_class(
          div0,
          "graphic--left",
          /*_layout*/
          ctx2[11].resizeInteractive && /*_layout*/
          ctx2[11].align === "right"
        );
      }
      if (!current || dirty[0] & /*_layout*/
      2048) {
        toggle_class(
          div0,
          "graphic--centre",
          /*_layout*/
          ctx2[11].resizeInteractive && /*_layout*/
          ctx2[11].align === "centre"
        );
      }
      if (dirty[0] & /*customPanel, panels, steps, _layout*/
      10243) {
        each_value = ensure_array_like(
          /*panels*/
          ctx2[1]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div1, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (!current || dirty[0] & /*_layout*/
      2048) {
        toggle_class(div1, "content--resized", !/*_layout*/
        ctx2[11].resizeInteractive);
      }
      if (!current || dirty[0] & /*_layout*/
      2048) {
        toggle_class(
          div2,
          "scrollyteller--resized",
          /*_layout*/
          ctx2[11].resizeInteractive
        );
      }
      if (!current || dirty[0] & /*isDebug*/
      1024) {
        toggle_class(
          div2,
          "scrollyteller--debug",
          /*isDebug*/
          ctx2[10]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(deprecationnotice.$$.fragment, local);
      transition_in(panelobserver.$$.fragment, local);
      transition_in(if_block2);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(deprecationnotice.$$.fragment, local);
      transition_out(panelobserver.$$.fragment, local);
      transition_out(if_block2);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
        detach(t3);
        detach(div2);
      }
      if (if_block0) if_block0.d(detaching);
      destroy_component(deprecationnotice, detaching);
      destroy_component(panelobserver, detaching);
      if (if_block1) if_block1.d(detaching);
      detach(if_block1_anchor);
      if (if_block2) if_block2.d();
      ctx[19](null);
      destroy_each(each_blocks, detaching);
      ctx[20](null);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let _layout;
  let maxScrollSpeed;
  let isDebug;
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  let { customPanel = null } = $$props;
  let { panels } = $$props;
  let { onProgress = false } = $$props;
  let { onMarker = null } = $$props;
  let { observerOptions } = $$props;
  let { discardSlot = false } = $$props;
  let { layout = {} } = $$props;
  const isOdyssey = window.__IS_ODYSSEY_FORMAT__;
  let scrollytellerRef;
  let steps = [];
  let marker;
  let scrollingPos;
  let isInViewport = false;
  let scrollSpeed = 0;
  let deferUntilScrollSettlesActions = [];
  let graphicRootEl;
  const scrollytellerObserver = new IntersectionObserver(([scrollytellerEntry]) => deferUntilScrollSettles(() => {
    $$invalidate(9, isInViewport = scrollytellerEntry.isIntersecting);
  }));
  const deferUntilScrollSettles = (fn) => {
    if (scrollSpeed < maxScrollSpeed) {
      fn();
    } else {
      deferUntilScrollSettlesActions = [...deferUntilScrollSettlesActions, fn];
    }
  };
  const runDeferredActions = () => {
    if (scrollSpeed < maxScrollSpeed) {
      if (deferUntilScrollSettlesActions.length) {
        deferUntilScrollSettlesActions.forEach((fn) => fn());
        deferUntilScrollSettlesActions = [];
      }
    }
  };
  onMount(() => {
    scrollingPos = getScrollingPos(scrollytellerRef);
    if (scrollingPos === ScrollPositions.ABOVE) $$invalidate(6, marker = panels[0].data);
    if (scrollingPos === ScrollPositions.BELOW) $$invalidate(6, marker = panels[panels.length - 1].data);
    if (discardSlot) {
      scrollytellerObserver.observe(scrollytellerRef);
    }
    getScrollSpeed((newSpeed) => {
      scrollSpeed = newSpeed;
      runDeferredActions();
    });
  });
  function progress_handler(event) {
    bubble.call(this, $$self, event);
  }
  function panelobserver_marker_binding(value) {
    marker = value;
    $$invalidate(6, marker);
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      graphicRootEl = $$value;
      $$invalidate(7, graphicRootEl);
    });
  }
  function div2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      scrollytellerRef = $$value;
      $$invalidate(8, scrollytellerRef);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("customPanel" in $$props2) $$invalidate(0, customPanel = $$props2.customPanel);
    if ("panels" in $$props2) $$invalidate(1, panels = $$props2.panels);
    if ("onProgress" in $$props2) $$invalidate(2, onProgress = $$props2.onProgress);
    if ("onMarker" in $$props2) $$invalidate(3, onMarker = $$props2.onMarker);
    if ("observerOptions" in $$props2) $$invalidate(4, observerOptions = $$props2.observerOptions);
    if ("discardSlot" in $$props2) $$invalidate(5, discardSlot = $$props2.discardSlot);
    if ("layout" in $$props2) $$invalidate(14, layout = $$props2.layout);
    if ("$$scope" in $$props2) $$invalidate(15, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*layout*/
    16384) {
      $$invalidate(11, _layout = {
        align: layout.align || "centre",
        resizeInteractive: layout.resizeInteractive ?? true,
        transparentFloat: layout.transparentFloat ?? ["left", "right"].includes(layout.align)
      });
    }
    if ($$self.$$.dirty[0] & /*discardSlot*/
    32) {
      maxScrollSpeed = discardSlot ? 0.5 : Infinity;
    }
    if ($$self.$$.dirty[0] & /*graphicRootEl*/
    128) {
      if (graphicRootEl) {
        dispatch("load", graphicRootEl);
      }
    }
    if ($$self.$$.dirty[0] & /*marker*/
    64) {
      marker && deferUntilScrollSettles(() => dispatch("marker", marker));
    }
  };
  $$invalidate(10, isDebug = typeof location !== "undefined" && location.hash === "#debug=true");
  return [
    customPanel,
    panels,
    onProgress,
    onMarker,
    observerOptions,
    discardSlot,
    marker,
    graphicRootEl,
    scrollytellerRef,
    isInViewport,
    isDebug,
    _layout,
    isOdyssey,
    steps,
    layout,
    $$scope,
    slots,
    progress_handler,
    panelobserver_marker_binding,
    div0_binding,
    div2_binding
  ];
}
class Scrollyteller extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$1,
      create_fragment$1,
      safe_not_equal,
      {
        customPanel: 0,
        panels: 1,
        onProgress: 2,
        onMarker: 3,
        observerOptions: 4,
        discardSlot: 5,
        layout: 14
      },
      add_css,
      [-1, -1]
    );
  }
  get customPanel() {
    return this.$$.ctx[0];
  }
  set customPanel(customPanel) {
    this.$$set({ customPanel });
    flush();
  }
  get panels() {
    return this.$$.ctx[1];
  }
  set panels(panels) {
    this.$$set({ panels });
    flush();
  }
  get onProgress() {
    return this.$$.ctx[2];
  }
  set onProgress(onProgress) {
    this.$$set({ onProgress });
    flush();
  }
  get onMarker() {
    return this.$$.ctx[3];
  }
  set onMarker(onMarker) {
    this.$$set({ onMarker });
    flush();
  }
  get observerOptions() {
    return this.$$.ctx[4];
  }
  set observerOptions(observerOptions) {
    this.$$set({ observerOptions });
    flush();
  }
  get discardSlot() {
    return this.$$.ctx[5];
  }
  set discardSlot(discardSlot) {
    this.$$set({ discardSlot });
    flush();
  }
  get layout() {
    return this.$$.ctx[14];
  }
  set layout(layout) {
    this.$$set({ layout });
    flush();
  }
}
create_custom_element(Scrollyteller, { "customPanel": {}, "panels": {}, "onProgress": { "type": "Boolean" }, "onMarker": {}, "observerOptions": {}, "discardSlot": { "type": "Boolean" }, "layout": {} }, ["default"], [], true);
function create_if_block(ctx) {
  let scrollyteller;
  let current;
  const scrollyteller_spread_levels = [
    { panels: (
      /*panels*/
      ctx[0]
    ) },
    { layout: (
      /*layout*/
      ctx[1]
    ) },
    /*$$restProps*/
    ctx[2]
  ];
  let scrollyteller_props = {};
  for (let i = 0; i < scrollyteller_spread_levels.length; i += 1) {
    scrollyteller_props = assign(scrollyteller_props, scrollyteller_spread_levels[i]);
  }
  scrollyteller = new Scrollyteller({ props: scrollyteller_props });
  scrollyteller.$on(
    "progress",
    /*progress_handler*/
    ctx[3]
  );
  scrollyteller.$on(
    "marker",
    /*marker_handler*/
    ctx[4]
  );
  scrollyteller.$on(
    "load",
    /*load_handler*/
    ctx[5]
  );
  return {
    c() {
      create_component(scrollyteller.$$.fragment);
    },
    m(target, anchor) {
      mount_component(scrollyteller, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const scrollyteller_changes = dirty & /*panels, layout, $$restProps*/
      7 ? get_spread_update(scrollyteller_spread_levels, [
        dirty & /*panels*/
        1 && { panels: (
          /*panels*/
          ctx2[0]
        ) },
        dirty & /*layout*/
        2 && { layout: (
          /*layout*/
          ctx2[1]
        ) },
        dirty & /*$$restProps*/
        4 && get_spread_object(
          /*$$restProps*/
          ctx2[2]
        )
      ]) : {};
      scrollyteller.$set(scrollyteller_changes);
    },
    i(local) {
      if (current) return;
      transition_in(scrollyteller.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(scrollyteller.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(scrollyteller, detaching);
    }
  };
}
function create_fragment(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*panels*/
    ctx[0].length && create_if_block(ctx)
  );
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*panels*/
        ctx2[0].length
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*panels*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  const omit_props_names = ["panels", "layout"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { panels = [] } = $$props;
  let { layout = {} } = $$props;
  function progress_handler(event) {
    bubble.call(this, $$self, event);
  }
  function marker_handler(event) {
    bubble.call(this, $$self, event);
  }
  function load_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("panels" in $$new_props) $$invalidate(0, panels = $$new_props.panels);
    if ("layout" in $$new_props) $$invalidate(1, layout = $$new_props.layout);
  };
  return [panels, layout, $$restProps, progress_handler, marker_handler, load_handler];
}
class Scrollyteller_wc extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { panels: 0, layout: 1 });
  }
  get panels() {
    return this.$$.ctx[0];
  }
  set panels(panels) {
    this.$$set({ panels });
    flush();
  }
  get layout() {
    return this.$$.ctx[1];
  }
  set layout(layout) {
    this.$$set({ layout });
    flush();
  }
}
customElements.define("abcnews-scrollyteller", create_custom_element(Scrollyteller_wc, { "panels": {}, "layout": {} }, [], [], false));
var makeArray = (val) => typeof val === "string" ? [val] : val;
function src_default(string, { propMap = {}, arrayProps = [], noTypeGuessing = [] } = {}) {
  const config = string.match(/[A-Z]+([0-9a-z]|$)+/g) || [];
  arrayProps = makeArray(arrayProps);
  noTypeGuessing = makeArray(noTypeGuessing);
  const result = config.map((str) => {
    const [, keyStr, valueStr] = str.match(/^([A-Z]+)([0-9a-z]*$)/) || [];
    if (typeof keyStr !== "string" || typeof valueStr !== "string") {
      throw new Error("Error reading key/value pair");
    }
    const key = propMap[keyStr.toLowerCase()] || keyStr.toLowerCase();
    const value = noTypeGuessing.includes(key) ? valueStr : parseFloat(valueStr).toString() === valueStr ? parseFloat(valueStr) : valueStr === "true" || valueStr === "yes" ? true : valueStr === "false" || valueStr === "no" ? false : valueStr === "" ? null : valueStr;
    return { key, value };
  }).reduce((obj, { key, value }, _, arr) => {
    if (typeof obj[key] !== "undefined")
      return obj;
    const allKeyValues = arr.filter(({ key: k }) => k === key).map((d) => d.value);
    const makeArray2 = arrayProps.includes(key) || allKeyValues.length > 1;
    if (makeArray2) {
      const err = new Error(
        "Inconsistent types in array property '" + key + "'"
      );
      if (typeof value === "string") {
        const vals = allKeyValues.filter(
          (d) => typeof d === "string"
        );
        if (vals.length !== allKeyValues.length)
          throw err;
        obj[key] = vals;
      }
      if (typeof value === "number") {
        const vals = allKeyValues.filter(
          (d) => typeof d === "number"
        );
        if (vals.length !== allKeyValues.length)
          throw err;
        obj[key] = vals;
      }
      if (typeof value === "boolean") {
        const vals = allKeyValues.filter(
          (d) => typeof d === "boolean"
        );
        if (vals.length !== allKeyValues.length)
          throw err;
        obj[key] = vals;
      }
    } else {
      obj[key] = value;
    }
    return obj;
  }, {});
  arrayProps.forEach((key) => {
    if (typeof result[key] === "undefined") {
      result[key] = [];
    }
  });
  return result;
}
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
function isUsed(mount) {
  return !!mount.dataset.mountUsed;
}
function isUsedBy(mount) {
  return mount.dataset.mountUsed;
}
function useMount(mount) {
  if (mount.dataset.mountUsed && mount.dataset.mountUsed !== INSTANCE_ID)
    throw new Error(ERROR_MOUNT_ALREADY_USED);
  mount.dataset.mountUsed = INSTANCE_ID;
  return mount;
}
function selectMounts(selector, {
  exact = false,
  includeOwnUsed = false,
  markAsUsed = true
} = {}) {
  const s = selector !== void 0 ? exact ? exactMountSelector(selector) : prefixedMountSelector(selector) : MOUNT_SELECTOR;
  return Array.from(document.querySelectorAll(s)).filter((el) => isMount(el)).filter(
    (mount) => includeOwnUsed ? isUsedBy(mount) === INSTANCE_ID || !isUsed(mount) : !isUsed(mount)
  ).map((mount) => {
    markAsUsed && useMount(mount);
    return mount;
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
  nodes.forEach((node, index) => {
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
    if (index === nodes.length - 1) {
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
