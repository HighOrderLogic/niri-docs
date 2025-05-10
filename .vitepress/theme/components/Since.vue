<script setup lang="ts">
interface Props {
    nextRelease?: boolean,
    version?: string
}

const props = withDefaults(defineProps<Props>(), {
    nextRelease: false,
    version: 'unknown'
})
</script>

<template>
    <Badge :type='props.nextRelease ? "warning" : "info"' :text='`Since: ${ props.nextRelease ? "next release" : props.version }`' />
</template>