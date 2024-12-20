<template>
    <BaseFormField :title="title" :error="error">
        <textarea v-model="dataValue" class="form__input form__input--area"
        :placeholder="placeholder"></textarea>
    </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';
    export default {
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