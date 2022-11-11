import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useContactsStore = defineStore('contacts', {
  state: () => ({ data: [] }),
  actions: {
    addContact(newContact) {
      newContact.id = Date.now();
      this.data.push(newContact);
    },
    editContact(editedContact) {
      let index = this.data.findIndex((x) => x.id == editedContact.id);
      this.data.splice(index, 1, editedContact);
    },
    deleteContact(id) {
      let index = this.data.findIndex((x) => String(x.id) == String(id));
      this.data.splice(index, 1);
    }
  },
})
