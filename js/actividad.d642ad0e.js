(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-0206bfa0"],
  {
    ab14: function (t, e, i) {
      "use strict";

      e["a"] = {
        data: () => ({
          mainId: Math.floor(Math.random() * 10000000),
          selected: 0,
          elements: [],
          stateStr: "",
          rendered: false,
          firstSelection: true,
        }),

        watch: {
          menuState() {
            this.domUpdated();
          },
        },

        created() {
          window.addEventListener("resize", this.domUpdated);
        },

        mounted() {
          this.$nextTick(() => this.crearElementos());
        },

        computed: {
          menuState() {
            return this.$store.getters.isMenuOpen;
          },

          navObj() {
            if (!this.elements.length || !this.secuencial) return {};

            const idsArr = this.elements.map(elm => elm.id);
            const idx = idsArr.indexOf(this.selected);

            if (idx < 0) return {};

            const nav = {};

            if (idx === 0) {
              nav.next = idsArr[idx + 1];
            } else if (idx === idsArr.length - 1) {
              nav.back = idsArr[idx - 1];
            } else {
              nav.next = idsArr[idx + 1];
              nav.back = idsArr[idx - 1];
            }

            return nav;
          },
        },

        beforeDestroy() {
          window.removeEventListener("resize", this.domUpdated);
        },

        updated() {
          this.$nextTick(() => {
            if (this.getStateStr() !== this.stateStr) {
              this.crearElementos();
            }
          });
        },

        methods: {
          crearElementos() {
            if (!this.$slots.default?.length) return [];

            this.domUpdated();

            this.elements = this.$slots.default.map((elemento, index) => {
              const attrs = elemento.data?.attrs || {};

              return {
                id: this.mainId + index + 1,
                elm: elemento.elm,
                ...attrs,
              };
            });

            if (this.firstSelection) {
              this.selected = this.selected || this.elements[0].id;
            }

            this.stateStr = this.getStateStr();
          },

          getActiveHeight(id) {
            return this.$refs[id][0].scrollHeight + "px";
          },

          getStateStr() {
            return this.$slots.default
              .map(elm => elm.elm.outerHTML)
              .join("");
          },

          domUpdated() {
            this.rendered = false;
            setTimeout(() => {
              this.rendered = true;
            }, 100);
          },
        },
      };
    },
  },
]);
