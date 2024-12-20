<template>
    <BaseFormField :title="title" :error="error">
        <input v-model="dataValue" class="form__input" :type="type" :placeholder="placeholder">
    </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';
    export default {
        // props: [type],
        props: {
            type: {
                default: 'text'
            }
        },
        mixins: [formFieldMixin]
    }
    // import BaseFormField from '@/components/BaseFormField';

    // export default {
    //     props: ['title','error','placeholder','value'],
    //     components: { BaseFormField },
    //     computed: {
    //         dataValue: {
    //             get() {
    //                 return this.value;
    //             },
    //             set(value) {
    //                 this.$emit('input', value);
    //             }
    //         }
    //     }
    // }
</script>