<script setup>
import { ref, inject, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, numeric } from '@vuelidate/validators';
import UiModalWrapper from '@/components/UI/UiModalWrapper.vue';
import UiInput from '@/components/UI/UiInput.vue';
import UiCheckbox from '@/components/UI/UiCheckbox.vue';
import UiFormGroup from '@/components/UI/UiFormGroup.vue';
import UiSelectSingle from '@/components/UI/UiSelectSingle.vue';
import UiPagination from '@/components/UI/UiPagination.vue';
import { useDataTable } from '@/composables/useDataTable.js';

const injectToaster = inject('toaster');

const currentPage = ref(1);
const modalAdd = ref(false);
const modalEdit = ref(false);
const tags = ['family', 'work', 'studies', 'friends'];
const newContact = ref({
  id: '',
  fio: '',
  phone: '',
  address: '',
  tags: [],
});
const editedContact = ref({
  id: '',
  fio: '',
  phone: '',
  address: '',
  tags: [],
});
const filterModel = ref({
  fio: '',
  phone: '',
  address: '',
  tags: [],
});
const data = ref([]);

const rules = {
  fio: { required },
  phone: { 
    required,
    minLength: minLength(9),
    numeric 
  },
  address: { required, email },
};

const v$ = useVuelidate(rules, newContact);
const v_edit$ = useVuelidate(rules, editedContact);
// for (let i = 0; i < 22; i++) {
//   let random = Math.ceil(Math.random() * 100);
//   data.value.push({
//     id: i,
//     fio: i,
//     phone: `name-${i}`,
//     address: random,
//   });
// }

function closeModal() {
  modalAdd.value = false;
  modalEdit.value = false;
  this.v$.$reset();
  this.v_edit$.$reset();
  newContact.value = {
    id: '',
    fio: '',
    phone: '',
    address: '',
    tags: [],
  };
}
function addContact() {
  this.v$.$validate();
  if (!this.v$.$invalid) {
    newContact.value.id = Date.now();
    data.value.push(newContact.value);
    injectToaster.success(`Contact ${newContact.value.fio} added!`);
    closeModal();
  }
}
function editContactShow(id) {
  editedContact.value = data.value.find((x) => String(x.id) == String(id));
  modalEdit.value = true;
}
function editContact() {
  this.v_edit$.$validate();
  if (!this.v_edit$.$invalid) {
    let index = data.value.findIndex((x) => x.id == editedContact.value.id);
    data.value.splice(index, 1, editedContact.value);
    closeModal();
  }
}
function deleteContact(id) {
  let index = data.value.findIndex((x) => String(x.id) == String(id));
  data.value.splice(index, 1);
  injectToaster.error(`Contact with id ${index} deleted!`);
}

const { showAll, selectPerpages, perPageData, sortedData, showAllPages, sort, perPagesList } = useDataTable(
  currentPage,
  data,
  filterModel,
);
</script>

<template>
  <div class="contacts">
    <div class="container">
      <div class="contacts__add">
        <ui-button class="btn-bg" @click="modalAdd = !modalAdd">Add contact</ui-button>
        <ui-modal-wrapper v-show="modalAdd" @close="closeModal()">
          <template #modal-body>
            <div class="contacts__add">
              <div class="contacts__add-item">
                <ui-form-group label="FIO">
                  <ui-input v-model="v$.fio.$model" placeholder="Enter FIO" />
                  <div class="input-errors" v-for="error of v$.fio.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </ui-form-group>
              </div>
              <div class="contacts__add-item">
                <ui-form-group label="Phone">
                  <ui-input v-model="v$.phone.$model" placeholder="Enter phone" />
                  <div class="input-errors" v-for="error of v$.phone.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </ui-form-group>
              </div>
              <div class="contacts__add-item">
                <ui-form-group label="Address">
                  <ui-input v-model="v$.address.$model" placeholder="Enter address" />
                  <div class="input-errors" v-for="error of v$.address.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </ui-form-group>
              </div>
              <div class="contacts__add-item">
                <ui-form-group label="Tags">
                  <div class="contacts__add-tags df fww">
                    <ui-checkbox v-for="t in tags" :key="t" v-model="newContact.tags" :value="t">{{ t }}</ui-checkbox>
                  </div>
                </ui-form-group>
              </div>
            </div>
            <ui-button class="btn-bg" @click="addContact()">Add contact</ui-button>
          </template>
        </ui-modal-wrapper>
      </div>
      <div class="contacts__filter flexRow marginIndents flexWrap">
        <div class="contacts__filter-item flexCell">
          <ui-form-group label="FIO">
            <ui-input v-model="filterModel.fio" placeholder="Enter FIO" />
          </ui-form-group>
        </div>
        <div class="contacts__filter-item flexCell">
          <ui-form-group label="Phone">
            <ui-input v-model="filterModel.phone" placeholder="Enter phone" />
          </ui-form-group>
        </div>
        <div class="contacts__filter-item flexCell">
          <ui-form-group label="Address">
            <ui-input v-model="filterModel.address" placeholder="Enter address" />
          </ui-form-group>
        </div>
        <div class="contacts__filter-item flexCell">
          <ui-form-group label="Tags">
            <div class="contacts__add-tags df fww">
              <ui-checkbox v-for="t in tags" :key="t" v-model="filterModel.tags" :value="t">{{ t }}</ui-checkbox>
            </div>
          </ui-form-group>
        </div>
      </div>
      <div class="contacts__inner">
        <table class="contacts__table">
          <thead>
            <th @click="sort('fio')">
              <span>FIO</span>
            </th>
            <th @click="sort('phone')">
              <span>Phone</span>
            </th>
            <th @click="sort('address')">
              <span>Address</span>
            </th>
            <th colspan="2">
              <span>Tags</span>
            </th>
          </thead>
          <tbody v-if="perPageData.length > 0">
            <tr v-for="d in perPageData" :key="d.index">
              <td>{{ d.fio }}</td>
              <td>{{ d.phone }}</td>
              <td>{{ d.address }}</td>
              <td>
                <div class="contacts__tags">
                  <span v-for="t in d.tags" :key="t" class="contacts__tags-item">{{ t }}</span>
                </div>
              </td>
              <td>
                <div class="contacts__actions">
                  <ui-button @click="editContactShow(d.id)" class="btn-edit">
                    <ui-icon icon="icon-edit" />
                  </ui-button>
                  <ui-button @click="deleteContact(d.id)" class="btn-delete">
                    <ui-icon icon="icon-delete" icon-color="#ff0000" />
                  </ui-button>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4">Data not found</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="sortedData.length > 10" class="pagination__wrapper">
        <div class="pagination__wrapper-inner">
          <div v-if="!showAll" class="pagination__perpage">
            <span>Показать по: </span>
            <ui-select-single
              v-model="selectPerpages"
              model-key="number"
              visible-key="number"
              :options="perPagesList"
              title="Choose.."
              name="perPagesList"
            />
          </div>
          <div v-if="selectPerpages < sortedData.length || showAll" class="pagination">
            <ui-button @click="showAllPages()">
              {{ showAll ? 'Показать постранично' : 'Показать все' }}
            </ui-button>
            <ui-pagination
              v-if="!showAll"
              v-model="currentPage"
              :per-pages="selectPerpages"
              :total="sortedData.length"
            />
          </div>
        </div>
      </div>
    </div>
    <ui-modal-wrapper v-show="modalEdit" @close="closeModal()">
      <template #modal-body>
        <div class="contacts__add">
          <div class="contacts__add-item">
            <ui-form-group label="FIO">
              <ui-input v-model="v_edit$.fio.$model" placeholder="Enter FIO" />
              <div class="input-errors" v-for="error of v_edit$.fio.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </ui-form-group>
          </div>
          <div class="contacts__add-item">
            <ui-form-group label="Phone">
              <ui-input v-model="v_edit$.phone.$model" placeholder="Enter phone" />
              <div class="input-errors" v-for="error of v_edit$.phone.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </ui-form-group>
          </div>
          <div class="contacts__add-item">
            <ui-form-group label="Address">
              <ui-input v-model="v_edit$.address.$model" placeholder="Enter address" />
              <div class="input-errors" v-for="error of v_edit$.address.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </ui-form-group>
          </div>
          <div class="contacts__add-item">
            <ui-form-group label="Tags">
              <div class="contacts__add-tags df fww">
                <ui-checkbox v-for="t in tags" :key="t" v-model="editedContact.tags" :value="t">{{ t }}</ui-checkbox>
              </div>
            </ui-form-group>
          </div>
        </div>
        <ui-button class="btn-bg" @click="editContact()">Edit contact</ui-button>
      </template>
    </ui-modal-wrapper>
  </div>
</template>

<style lang="scss">
.contacts {
  padding: 60px 0;
  &__add {
    margin-bottom: 30px;
    &-tags {
      .checkbox {
        margin-right: 35px;
      }
    }
  }
  &__filter {
    &-item {
      width: 33.3%;
    }
  }
  &__tags {
    &-item {
      display: inline-block;
      border: 1px solid $hoverBrandColor;
      border-radius: $borderRadius;
      padding: 5px 7px;
      margin: 5px 5px 5px 0;
      color: $hoverBrandColor;
    }
  }
  &__table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    td,
    th {
      padding: 10px;
      border: 1px solid $brandColor;
    }
  }
  &__actions {
    button {
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
}
@media (max-width: 767px) {
  .contacts {
    &__inner {
      overflow-x: auto;
    }
    &__table {
      table-layout: fixed;
      td,
      th {
        width: 150px;
      }
    }
  }
}
</style>
