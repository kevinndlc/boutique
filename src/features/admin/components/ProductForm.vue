<script setup lang="ts">
  import { useForm, useField } from 'vee-validate'
  import { z } from 'zod'
  import { toFormValidator } from '@vee-validate/zod'

  const required = { required_error: 'Veuillez renseigner ce champ'}
  
  const validationSchema = toFormValidator(
    z.object({
      title: z.string(required).min(1, { message: 'Le titre doit faire au moins 1 caractère'}).max(20, { message: 'Le titre doit faire moins de 20 caractères'}),
      image: z.string(required),
      price: z.number(required).min(1, { message: 'Le prix doit être supérieur à 0'}).max(15000, 'Le prix doit être inférieur à 15 000'),
      description: z.string(required).min(10, { message: 'La description doit faire au moins 10 caractères'}),
      category: z.string({ ...required })
    })
  )

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema
  })

  const title = useField('title');
  const image = useField('image');
  const price = useField('price');
  const description = useField('description');
  const category = useField('category');

  const trySubmit = handleSubmit(formValues => {
    console.log(formValues);
  })

</script>

<template>
  <div class="card">
    <h3 class="mb-20">Ajouter un article</h3>
    <form @submit="trySubmit">
      <div class="flex flex-col mb-20">
        <label class="mb-5" for="title">Titre</label>
        <input class="mb-5" v-model="title.value.value" id="title" type="text" placeholder="Acer Predator" />
        <small class="form-error" v-if="title.errorMessage.value">{{ title.errorMessage.value }}</small>
      </div>
      <div class="flex flex-col mb-20">
        <label class="mb-5" for="image">Image</label>
        <input class="mb-5" v-model="image.value.value" id="image" type="text" />
        <small class="form-error" v-if="image.errorMessage.value">{{ image.errorMessage.value }}</small>
      </div>
      <div class="flex flex-col mb-20">
        <label class="mb-5" for="price">Prix</label>
        <input class="mb-5" v-model="price.value.value" id="price" type="number" />
        <small class="form-error" v-if="price.errorMessage.value">{{ price.errorMessage.value }}</small>
      </div>
      <div class="flex flex-col mb-20">
        <label class="mb-5" for="description">Description</label>
        <textarea rows="5" class="mb-5" v-model="(description.value.value as string)" id="description"></textarea>
        <small class="form-error" v-if="description.errorMessage.value">{{ description.errorMessage.value }}</small>
      </div>
      <div class="flex flex-col mb-20">
        <label class="mb-5" for="category">Catégorie</label>
        <select class="mb-5" v-model="category.value.value" id="category">
          <option value="" disabled>Choisissez une catégorie</option>
          <option value="gamer">Jeu</option>
          <option value="desktop">Bureautique</option>
          <option value="streaming">Stream</option>
        </select>
        <small class="form-error" v-if="category.errorMessage.value">{{ category.errorMessage.value }}</small>
      </div>
      <button class="btn btn-primary" :disabled="isSubmitting">Sauvegarder</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
  .card {
    width: 100%;
    max-width: 500px;
  }

  button {
    float: right;
  }
</style>