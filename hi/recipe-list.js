//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {createVisualComponent, useDataList, useState} from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import RecipeUpdateForm from "recipeUpdateForm";
import RecipeImageForm from "recipeImageForm";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "RecipeList",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css``,
};

export const RecipeList = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const dataListResult = useDataList({
            handlerMap: {
                load: Calls.listRecipes,
                createItem: Calls.createRecipe
            },
            itemHandlerMap: {
                update: Calls.updateRecipe,
                delete: Calls.deleteRecipe,
                approve: Calls.approveRecipe
            },
            initialDtoIn: {data: {}}
        });
        const ingredientListResult = useDataList({
            handlerMap: {
                load: Calls.listIngredients,
            },
            initialDtoIn: {data: {}}
        });
        const ingredientMap = {};
        if (ingredientListResult.data) {
            ingredientListResult.data.forEach(ingredient => ingredientMap[ingredient.data.id] = ingredient.data)
        }

        const [selectedRecipeData, setSelectedRecipeData] = useState(null)
        const [addRecipeImageData, setAddRecipeImageData] = useState(null)
        const [showAcceptedOnly, setShowAcceptedOnly] = useState(true)  
        const columns = [
            {
                cell: cellProps => {
                    return (
                        <UU5.Bricks.Image
                            // alt={"https://cdn.iconscout.com/icon/free/png-256/japanese-food-819250.png"}
                            src={"http://localhost:3000/recipeImage/get?code=" + cellProps.data.data.id}
                            type={"rounded"}
                            style={{maxHeight: "60px"}}
                        />
                    )
                },
                header: <UU5.Bricks.Lsi lsi={{en: "Cover", cs: "Obal"}}/>,
                width: "100px"
            },
            {
                cell: cellProps => {
                    return cellProps.data.data.id
                },
                header: "id",
                width: "10%"
            },
            {
                cell: cellProps => cellProps.data.data.name,
                header: <UU5.Bricks.Lsi lsi={{en: "Name", cs: "Název"}}/>
            },
            {
                cell: cellProps => cellProps.data.data.description ? cellProps.data.data.description : "undefined",
                header: <UU5.Bricks.Lsi lsi={{en: "Description", cs: "Postup"}}/>,
                width: "30%"
            },
            {
                cell: cellProps => {
                    let result = [];
                    cellProps.data.data.ingredientList.forEach(ingredientId => result.push(ingredientMap[ingredientId] && ingredientMap[ingredientId].name))
                    return result.join(", ")
                },
                header: <UU5.Bricks.Lsi lsi={{en: "Ingredients", cs: "Ingredience"}}/>
            },
            {
                cell: cellProps => {
                    if (cellProps.data.data.approved) {
                        return (
                            <div className={"right"}>
                                <UU5.Bricks.Button
                                    content={<UU5.Bricks.Icon icon={"mdi-pencil"}/>}
                                    colorSchema={"blue"}
                                    bgStyle={"transparent"}
                                    onClick={() => setSelectedRecipeData(cellProps.data)}
                                />
                                <UU5.Bricks.Button
                                    content={<UU5.Bricks.Icon icon={"mdi-file-image"}/>}
                                    colorSchema={"blue"}
                                    bgStyle={"transparent"}
                                    onClick={() => setAddRecipeImageData(cellProps.data)}
                                    tooltip={{en: "add cover", cs: "přidat obal"}}
                                />
                                <UU5.Bricks.Button
                                    content={<UU5.Bricks.Icon icon={"mdi-delete"}/>}
                                    colorSchema={"red"}
                                    bgStyle={"transparent"}
                                    onClick={() => cellProps.data.handlerMap.delete({data: {id: cellProps.data.data.id}})}
                                />
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className={"center"}>
                                <UU5.Bricks.Button
                                    content={<UU5.Bricks.Icon icon={"mdi-check"}/>}
                                    colorSchema={"green"}
                                    bgStyle={"transparent"}
                                    onClick={() => cellProps.data.handlerMap.approve({data: {id: cellProps.data.data.id}})}
                                />
                                <UU5.Bricks.Button
                                    content={<UU5.Bricks.Icon icon={"mdi-delete"}/>}
                                    colorSchema={"red"}
                                    bgStyle={"transparent"}
                                    onClick={() => cellProps.data.handlerMap.delete({data: {id: cellProps.data.data.id}})}
                                />
                            </div>
                        )
                    }
                },
                width: 150
            },

        ];

        function getChild() {
            let child;
            let dataList;
            switch (dataListResult.state) {
                case "pendingNoData":
                case "pending":
                    child = <UU5.Bricks.Loading/>
                    break;
                case "readyNoData":
                case "ready":
                     if (showAcceptedOnly) {
                        dataList = dataListResult.data.filter(item => {
                            return item.data.approved
                        })
                    } else {
                        dataList = dataListResult.data
                    }
                    child = (
                        <Uu5Tiles.List
                            height="auto"
                            data={dataList}
                            columns={columns}
                            rowHeight={"76px"}
                            rowAlignment={"center"}
                        />
                    );
                    break;
                case "errorNoData":
                case "error":
                    child = "error";
                    break;
            }
            return child;
        }

        function showRecipe(id) {
            UU5.Environment.getRouter().setRoute("recipe", {id: id})
        }

        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        return (
            <div {...attrs} className={"uu5-common-padding-s"}>
                <UU5.Bricks.Modal offsetTop={100} shown={selectedRecipeData}>
                    <RecipeUpdateForm
                        createItem={dataListResult.handlerMap.createItem}
                        setSelectedRecipeData={setSelectedRecipeData}
                        selectedRecipeData={selectedRecipeData}
                    />
                </UU5.Bricks.Modal>
                <UU5.Bricks.Modal offsetTop={100} shown={addRecipeImageData}>
                    <RecipeImageForm
                        setAddRecipeImageData={setAddRecipeImageData}
                        addRecipeImageData={addRecipeImageData}
                    />
                </UU5.Bricks.Modal>
                <UU5.Bricks.Header content={<UU5.Bricks.Lsi lsi={{en: "Recipe List", cs: "Seznam receptů"}}/>} level={3}/>
                <div className={"right"}>
                    <UU5.Bricks.Button
                        content={<UU5.Bricks.Lsi lsi={{en: "Create Recipe", cs: "Vytvořit knihu"}}/>}
                        colorSchema={"green"}
                        onClick={() => setSelectedRecipeData({data: {}})}
                    />
                    <UU5.Bricks.Button
                    content={showAcceptedOnly
                        ? <UU5.Bricks.Lsi lsi={{en: "Show All", cs: "Zobrazit všechny"}}/>
                        : <UU5.Bricks.Lsi lsi={{en: "Show Accepted Only", cs: "Zobrazit pouze akceptované"}}/>
                    }
                    colorSchema={showAcceptedOnly ? "blue" : "pink"}
                    onClick={() => setShowAcceptedOnly(currentState => !currentState)}
                    />
                </div>
                {getChild()}
            </div>
        );
        //@@viewOff:render
    },
});

export default RecipeList;
