<script>
// template
/* <ui-select-single
    v-model="selectOption"
    model-key="name"
    visible-key="lang"
    :options="options"
    title="Choose.."
    name="optionsName"
    sorted
  /> */

import { gsap } from 'gsap';

export default {
  name: 'UiDropdown',

  props: {
    modelValue: {
      type: [String, Array, Number, Object],
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator: (options) => options.every((option) => typeof option === 'object' && option !== null),
    },
    title: {
      // placeholder
      type: String,
      required: true,
    },
    modelKey: {
      // имя ключа v-model
      type: String,
      required: true,
    },
    visibleKey: {
      // имя показываемого ключа
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    sorted: {
      // сортировка
      type: Boolean,
      default: false,
    },
    translated: {
      // перевод
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      isOpen: false,
      isDocClick: false,
    };
  },

  computed: {
    selected() {
      return this.options.find((option) => option[this.modelKey] === this.modelValue);
    },
    selectModel: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.select(value);
      },
    },
    sortedOptions() {
      if (this.sorted) {
        if (this.translated) {
          let arr = this.options.slice().sort((a, b) => {
            if (
              this.$t(a[this.visibleKey]) >
              this.$t(b[this.visibleKey])
            )
              return -1
          })
          return arr.reverse()
        } else {
          let arr = this.options.slice().sort((a, b) => {
            a[this.visibleKey] = String(a[this.visibleKey]).replace(/ +/g, ' ').trim()
            b[this.visibleKey] = String(b[this.visibleKey]).replace(/ +/g, ' ').trim()
            if (a[this.visibleKey] > b[this.visibleKey]) return -1
          })
          return arr.reverse()
        }
      } else {
        return this.options
      }
    },
  },
  watch: {
    'isOpen': function () {
      if (this.isOpen) {
        gsap.to(this.$refs.drop_menu, {
          height: 'auto',
          opacity: 1,
          onComplete: () => {
            this.$refs.drop_menu.style.overflowY = "auto"
          }
        })
      } else {
        if (this.$refs.drop_menu.style.height == '0px' && !this.isDocClick) this.isOpen = true
        else {
          gsap.to(this.$refs.drop_menu, {
            height: 0,
            opacity: 0,
            onStart: () => {
              this.$refs.drop_menu.style.overflowY = "hidden"
            }
          })
        }
      }
      this.isDocClick = false
    }
  },
  mounted() {
    this.documentClick()
  },
  methods: {
    select(value) {
      this.isOpen = false;
      this.$emit('update:modelValue', value);
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    documentClick() {
      document.addEventListener('click', (e) => {
        let target = e.path[0].classList.contains("dropdown__toggle");
        if (!target) {
          this.isOpen = false;
          this.isDocClick = true;
        } else {
          let toggle_btns = document.querySelectorAll('.dropdown__toggle')
          for (let i = 0; i < toggle_btns.length; i++) {
            if (toggle_btns[i] != e.path[0]) {
              gsap.to(toggle_btns[i].nextElementSibling, {
              height: 0,
                opacity: 0,
                onStart: () => {
                  this.$refs.drop_menu.style.overflowY = "hidden"
                }
              })
            }
          }
        }
      })
    },
  },
};
</script>

<template>
  <div :id="name" class="dropdown" :class="{ dropdown_opened: isOpen }">
    <button type="button" class="dropdown__toggle dropdown__toggle_icon" @click="toggleOpen">
      <span>{{ !!modelValue ? (translated ? $t(selected[visibleKey]) : selected[visibleKey]) : title }}</span>
      <ui-icon icon="icon-arrow" class="dropdown__icon" />
    </button>

    <div ref="drop_menu" class="dropdown__menu" role="listbox">
      <button
        v-for="option in sortedOptions"
        :key="option.id"
        class="dropdown__item"
        :class="{ active: option[modelKey] === selectModel }"
        role="option"
        type="button"
        @click="select(option[modelKey])"
      >
        {{ translated ? $t(option[visibleKey]) : option[visibleKey] }}
      </button>
    </div>

    <select v-model="selectModel" :name="name" style="display: none">
      <option v-for="option in sortedOptions" :key="option.id" :value="option[modelKey]">
        {{ translated ? $t(option[visibleKey]) : option[visibleKey] }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
.dropdown {
  position: relative;
  display: inline-block;
  &__icon {
    position: absolute;
    right: 10px;
    width: 15px;
    height: 15px;
  }
  &__menu {
    position: absolute;
    left: 0;
    top: calc(100% + 10px);
    background-color: $white;
    margin: 0;
    width: 100%;
    padding: 0;
    border-radius: 8px;
    left: 0;
    z-index: 8;
    background-clip: padding-box;
    // overflow-y: auto;
    border: 2px solid $brandColor;
    overflow: hidden;
    max-height: 200px;
    height: 0;
    opacity: 0;
  }
  &__item {
    display: block;
    background-color: $white;
    width: 100%;
    padding: 8px 16px;
    font-weight: 500;
    line-height: 1.2;
    box-shadow: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: 0.2s;
    outline: none;
    &:hover,
    &:focus,
    &.active {
      color: $brandColor;
    }
  }
  &__toggle {
    @extend .df, .aic;
    background-color: $white;
    border: 2px solid $brandColor;
    border-radius: 8px;
    position: relative;
    padding: 10px 40px 10px 15px;
    width: 200px;
    font-weight: 500;
    line-height: 1.2;
    transition: 0.2s;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span, svg {
      pointer-events: none;
    }
  }
  &_opened .dropdown__menu {
    display: block;
  }
}
</style>
