import { computed, ref } from 'vue';

export function useDataTable(currentPage, data, filterModel) {
  const showAll = ref(false);
  const currentSort = ref('index');
  const currentSortDir = ref('asc');
  const selectPerpages = ref(10);

  const perPageData = computed(() => {
    if (currentPage.value == 1) {
      return sortedData.value.slice(0, selectPerpages.value);
    }
    let start = (currentPage.value - 1) * selectPerpages.value,
      end = start + selectPerpages.value;
    if (start > sortedData.value.length) {
      start = 0
      currentPage.value = 1
    }
    return sortedData.value.slice(start, end);
  });
  const sortedData = computed(() => {
    let result
    result = data.value.filter((el) => {
      let bool = true
      Object.keys(filterModel.value).map((key) => {
        if (typeof filterModel.value[key] == "string" && String(el[key]).toLowerCase().includes(filterModel.value[key].toLowerCase())) {
          bool = bool && true
        } else if (typeof filterModel.value[key] != "string") {
          filterModel.value[key].map((t) => {
            if (String(el[key].join(" ")).toLowerCase().includes(t.toLowerCase())) {
              bool = bool && true
            } else bool = bool && false
          })
        } else bool = bool && false
      })
      if (bool) return el
    })
    result = result.sort((a, b) => {
        let mod = 1;
        if (currentSortDir.value === "desc") mod = -1;
        if (a[currentSort.value] < b[currentSort.value]) return -1 * mod;
        if (a[currentSort.value] > b[currentSort.value]) return 1 * mod;
      });
    return result
  })

  const showAllPages = () => {
    showAll.value = !showAll.value;
    selectPerpages.value = data.value.length;
    currentPage.value = 1;
    if (!showAll.value) selectPerpages.value = 10;
  };
  const sort = (e) => {
    if (e === currentSort.value) {
      currentSortDir.value =
        currentSortDir.value === "asc" ? "desc" : "asc"; // по алфавиту или в обратном порядке
    }
    currentSort.value = e;
  }

  const perPagesList = [
    {
      number: 10,
    },
    {
      number: 50,
    },
    {
      number: 100,
    },
  ];

  return {
    showAll,
    selectPerpages,

    perPageData,
    sortedData,

    showAllPages,
    sort,

    perPagesList,
  };
}
