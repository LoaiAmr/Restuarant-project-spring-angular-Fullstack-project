import { IngredientShoppingList } from '../shared/IngredientShoppingList';

export class Recipe{

    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: IngredientShoppingList[];

    constructor(id: number, name: string, description: string, imagePath: string, ingredients: IngredientShoppingList[] ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;

    }

}