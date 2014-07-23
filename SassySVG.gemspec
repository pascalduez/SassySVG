# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  # Release Specific Information
  s.version = "0.1.0"
  s.date = "2014-07-23"

  # Gem Details
  s.name = "SassySVG"
  s.rubyforge_project = "SassySVG"
  s.summary = %q{Sass SVG toolset.}
  s.description = %q{Sass SVG toolset.}
  s.authors = ["Pascal Duez"]
  s.homepage = "https://github.com/pascalduez/SassySVG"
  s.license = "MIT"

  # Files to Include
  s.require_paths = ["lib"]

  # README file
  s.files = ["README.md"]

  # CHANGELOG
  s.files += ["CHANGELOG.md"]

  # Library Files
  s.files += Dir.glob("lib/**/*.*")

  # Sass Files
  s.files += Dir.glob("dist/**/*.*")

  # Gem Bookkeeping
  s.required_rubygems_version = ">= 1.3.6"
  s.rubygems_version = %q{1.3.6}

  # Gems Dependencies
  s.add_dependency("sass", [">= 3.3"])
end
