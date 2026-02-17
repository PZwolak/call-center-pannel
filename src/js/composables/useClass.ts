const useClass = (baseClass: string) => {
  const className = (element?: string, modifier?: string) => {
    if (element && modifier) {
      return `${baseClass}__${element}--${modifier}`
    }
    if (modifier) {
      return `${baseClass}--${modifier}`
    }
    if (element) {
      return `${baseClass}__${element}`
    }
    return baseClass
  }

  const selector = (element?: string, modifier?: string) => {
    return `.${className(element, modifier)}`
  }

  return {
    baseClass,
    className,
    selector,
  }
}

export default useClass
export { useClass }
