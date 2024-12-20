class ItemsController < ApplicationController
  def index
    @items = Item.all
  end

  def new
    @item = Item.new
    set_categories
  end

  def create
    set_categories
    @item = Item.new(set_params)
    if @item.save
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    get_item
    set_categories
  end

  def update
    get_item
    set_categories
    if @item.update(set_params)
      redirect_to root_path
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def search
    item = Category.find(params[:item_id])
    children_item = item.children
    render json:{ item: children_item }
  end

  private

  def set_params
    params.require(:item).permit(:name, :category_id)
  end

  def get_item
    @item = Item.find(params[:id])
  end

  def set_categories
    @maincategories = Category.all.order("id ASC").limit(3)
  end
end
