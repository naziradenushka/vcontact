<script setup>
defineEmits(['close'])
</script>

<template>
  <transition name="modal">
    <div class="modal__wrapper" @click="$emit('close')">
      <div class="modal__inner" @click.stop="">
        <ui-button class="btn-close" @click="$emit('close')">
          <template #left-icon>
            <ui-icon icon="icon-close" class="icon-close" />
          </template>
        </ui-button>
        <slot name="modal-body">
          default body
        </slot>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.modal {
  &__wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: rgba(0, 0, 0, .5);
    overflow-y: auto;
    z-index: 9;
    transition: opacity .2s ease;
  }
  &__inner {
    position: relative;
    padding: 30px 15px 15px;
    max-width: 800px;
    width: 100%;
    background-color: $white;
    border-radius: 5px;
    transition: all .2s ease;
    .icon-close {
      width: 27px;
      height: 27px;
      &:hover {
        path {
          stroke: $error;
        }
      }
    }
    .search-results__table {
      table {
        width: 100%;
      }
      th,
      td {
        width: 50%;
        min-width: 50%;
        max-width: 50%;
      }
      tbody tr {
        cursor: context-menu;
      }
    }
  }
}

.modal-body {
  &__item {
    margin-bottom: 20px;
    p {
      margin: 0 0 10px;
      &.warning {
        margin-top: 15px;
      }
    }
    &.disabled {
      opacity: .7;
      pointer-events: none;
    }
    .mx-datepicker {
      width: 100%;
    }
    .btn-download {
      margin-bottom: 15px;
      .icon-delete {
        margin-left: 10px;
        &:hover {
          color: $error;
        }
      }
      .icon-download {
        width: 20px;
        height: 20px;
        margin-left: auto;
        &:hover {
          color: $brandColor;
        }
      }
      & > span {
        margin-right: 10px;
      }
    }
  }
  &__checkbox {
    margin-top: 15px;
    display: flex;
    input {
      margin: 2px 7px 0 0;
    }
  }
}

.modal-warning {
  &__title {
    color: $error;
  }
  &__actions {
    margin-top: 20px;
    button {
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
}

// Animation
.modal-enter-from {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter-to .modal__inner {
  transform: scale(1.1);
}
.modal-leave-active .modal__inner {
  transform: scale(1.2);
}
</style>
