<script setup>
import { ref } from "vue";

const props = defineProps({
    index: {
        type: [Number, 0],
        required: true,
    },
    weatherArray: {
        type: [Array, null],
        required: true,
    }
});

const dialogVisible = ref(false);

const showDialog = () => {
    dialogVisible.value = true;
};

const hideDialog = () => {
    dialogVisible.value = false;
};

const closeWindow = (index) => {
    const oldLocalStorageArchive = JSON.parse(localStorage.getItem('favoriteArray'))

    if (props.weatherArray.length) {
        props.weatherArray.splice(index, 1);
    }

    hideDialog();

    const newLocalStorageArchive = JSON.parse(localStorage.getItem('favoriteArray'))

    if (oldLocalStorageArchive !== newLocalStorageArchive) {
        localStorage.setItem('favoriteArray', JSON.stringify(props.weatherArray));
    }
};
</script>

<template>
    <div>
        <button class="close-button" @click="showDialog">X</button>
    </div>
    <div v-if="dialogVisible" class="cover-div"></div>
    <div v-if="dialogVisible" class="modal-div">
        <p class="text content">Close this item?</p>
        <div class="content">
            <button class="btn" @click="closeWindow(index)">Yes</button>
            <button class="btn" @click="hideDialog">No</button>
        </div>
    </div>
</template>

<style scoped>
.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    font-size: 15px;
    font-weight: bold;
    color: white;
    background:  rgb(252, 198, 198);
    cursor: pointer;
}

.close-button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px black;
    background: red;

}

.close-button:active {
    transform: scale(0.9);
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
}

.btn {
    margin: 10px;
}

.text {
    color: black;
}
</style>
