abstract class Presenter<Response> {
  public abstract transform(param: any): Response

  public transformMany(param: any[]): Response[] {
    return param.map(data => this.transform(data))
  }
}

export { Presenter }
