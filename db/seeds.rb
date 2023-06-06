# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et sapien dui. Sed sed aliquam nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec accumsan, ante a finibus ultricies, metus mi vehicula diam, non gravida justo diam vel justo. Nam ullamcorper nunc in sapien tempor pulvinar. In ipsum risus, elementum at efficitur eget, vulputate quis lacus. Quisque vitae felis ut nisl commodo euismod. In facilisis augue vitae elementum faucibus. Suspendisse mi tellus, cursus et imperdiet sed, finibus ac enim. Aliquam erat volutpat. Aenean pulvinar auctor nibh at iaculis."

Article.destroy_all
User.destroy_all

test_user = User.new({email: "trey@gmail.com", password: "password"})
test_article = Article.new({
    title: "example",
    body: "hell this is a sample article",
    user_id: test_user.id
})

test_article.author = test_user

test_user.save!
test_article.save!