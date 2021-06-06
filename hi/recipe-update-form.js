//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataList, useState} from "uu5g04-hooks";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "RecipeUpdateForm",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css ``,
};

export const RecipeUpdateForm = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        createItem: UU5.PropTypes.func,
        setSelectedRecipeData: UU5.PropTypes.func,
        selectedRecipeData: UU5.PropTypes.object
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const dataListResult = useDataList({
            handlerMap: {
                load: Calls.listIngredients,
            },
            initialDtoIn: { data: {} }
        });
        const [ingredientList, setIngredientList] = useState(props.selectedRecipeData && props.selectedRecipeData.data.ingredientList || []);
        let allIngredientList = [];
        var ingredientAttributes = {};
        dataListResult.data && dataListResult.data.forEach(ingredient => {
            if (ingredient.data.approved) {
                ingredientAttributes[ingredient.data.id] = {};
                ingredientAttributes[ingredient.data.id].name = ingredient.data.name;
                ingredientAttributes[ingredient.data.id].unit = ingredient.data.unit;
                console.debug(JSON.stringify(ingredientAttributes))
                allIngredientList.push(
                    <UU5.Forms.Select.Option
                        key={ingredient.data.id}
                        value={ingredient.data.id}
                        content={ingredient.data.name}
                    />
                )
            }
        })

        function onSave(opt) {
            if (props.selectedRecipeData && props.selectedRecipeData.data && props.selectedRecipeData.data.id) {
                props.selectedRecipeData.handlerMap.update({ data: opt.values })
            } else {
                props.createItem({ data: opt.values })
            }
            props.setSelectedRecipeData(null)
        }

        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
       let selectedRecipeData = props.selectedRecipeData && props.selectedRecipeData.data || {}

       function changeIngredientList(value) {
           setIngredientList(currentValue => { 
            let indexOfValue = currentValue.indexOf(value)
            if (indexOfValue === -1) {
                currentValue.push(value)
            }else {
                currentValue.splice(indexOfValue, 1)
            }
            return currentValue.slice();
        })
       };
       function _getIngredientName(ingredientId) {
            // console.debug("Ingredient: "+ JSON.stringify(ingredientAttributes[ingredientId]))
            if (ingredientAttributes && ingredientAttributes[ingredientId] && ingredientAttributes[ingredientId].name) {return ingredientAttributes[ingredientId].name;
            }else {
                return ingredientId;
            };
       };

       function _getIngredientUnit(ingredientId) {
            console.debug("list test: "+ JSON.stringify(ingredientAttributes[ingredientId]))
            if (ingredientAttributes && ingredientAttributes[ingredientId] && ingredientAttributes[ingredientId].unit) {return ingredientAttributes[ingredientId].unit;
            }else {
                return ingredientId;
            };
       };

       function _getIngredientNameAndUnit(ingredientId) {
        let unit = _getIngredientUnit(ingredientId);
        let name = _getIngredientName(ingredientId);
        return (name+ " (" + unit + ")");
       }

       function getIngredientAmount() {
        let ingredientAmount = []
        ingredientList.forEach(ingredient => {
            ingredientAmount.push(<UU5.Forms.Number
                label={_getIngredientNameAndUnit(ingredient)}
                name={ingredient}
                key={ingredient}
                />)
            console.debug("name added")
        })
        return ingredientAmount;
       }
        return (
            <div {...attrs} className={"uu5-common-padding-s"}>
                <UU5.Forms.Form
                    onSave={onSave}
                    onCancel={() => props.setSelectedRecipeData(undefined)}
                    header={selectedRecipeData && selectedRecipeData.id
                        ? <UU5.Bricks.Lsi lsi={{en: "Update Recipe", cs: "Upravit recept"}}/>
                        : <UU5.Bricks.Lsi lsi={{en: "Create Recipe", cs: "Vytvořit recept"}}/>
                    }
                    spacing={4}
                    level={5}
                    labelColWidth={"xs-12 s-12 m4 l4 xl4"}
                    inputColWidth={"xs-12 s-12 m6 l6 xl6"}
                >
                    <UU5.Forms.Text
                        name="id"
                        label="id"
                        placeholder="id"
                        required
                        value={selectedRecipeData && selectedRecipeData.id}
                        readOnly={selectedRecipeData && selectedRecipeData.id}
                    />
                    <UU5.Forms.Text
                        name="name"
                        label={<UU5.Bricks.Lsi lsi={{en: "Name", cs: "Název"}}/>}
                        placeholder="Some text..."
                        required
                        value={selectedRecipeData && selectedRecipeData.name}
                    />
                    <UU5.Forms.TextArea
                        name="description"
                        label={<UU5.Bricks.Lsi lsi={{en: "Description", cs: "Popis"}}/>}
                        placeholder="Some text..."
                        required
                        value={selectedRecipeData && selectedRecipeData.description}
                    />
                    <UU5.Forms.Select
                        name="ingredientList"
                        label={<UU5.Bricks.Lsi lsi={{en: "Ingredients", cs: "Ingredience"}}/>}
                        multiple={true}
                        reguired
                        value={ingredientList}
                        controlled={true}
                        onChange={opt => (changeIngredientList(opt.value))}
                    >
                        {allIngredientList}
                    </UU5.Forms.Select>
                    {getIngredientAmount()}
                    <UU5.Bricks.Line size={"s"}/>
                    <UU5.Forms.Controls/>
                </UU5.Forms.Form>
            </div>
        );
        //@@viewOff:render
    },
});

export default RecipeUpdateForm;